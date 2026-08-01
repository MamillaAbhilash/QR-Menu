import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DISHES, INITIAL_TABLES, INITIAL_ORDERS, INITIAL_SERVICE_REQUESTS } from '../data/seedData';
import { subscribeToSync, dispatchSyncEvent } from '../utils/broadcast';
import { getRestaurantSnapshot, saveRestaurantSnapshot } from '../utils/api';
import { soundFX } from '../utils/sound';

const RestaurantContext = createContext();

const STORAGE_KEYS = {
  DISHES: 'qr_menu_dishes',
  TABLES: 'qr_menu_tables',
  ORDERS: 'qr_menu_orders',
  SERVICE_REQUESTS: 'qr_menu_service_requests'
};

export function RestaurantProvider({ children }) {
  // Read initial window URL parameters (e.g. ?table=3)
  const getInitialTable = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      if (tableParam && !isNaN(tableParam)) {
        return parseInt(tableParam, 10);
      }
    }
    return 1;
  };

  const [activeView, setActiveView] = useState('customer'); // 'customer', 'waiter', 'admin'
  const [activeTable, setActiveTableState] = useState(getInitialTable());

  // Helper to load or fallback to seed data
  const loadStored = (key, fallback) => {
    if (typeof window === 'undefined') return fallback;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [dishes, setDishes] = useState(() => loadStored(STORAGE_KEYS.DISHES, INITIAL_DISHES));
  const [tables, setTables] = useState(() => loadStored(STORAGE_KEYS.TABLES, INITIAL_TABLES));
  const [orders, setOrders] = useState(() => loadStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
  const [serviceRequests, setServiceRequests] = useState(() => loadStored(STORAGE_KEYS.SERVICE_REQUESTS, INITIAL_SERVICE_REQUESTS));
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadRemoteData = async () => {
      try {
        const snapshot = await getRestaurantSnapshot();
        if (snapshot?.dishes) {
          setDishes(snapshot.dishes);
        }
        if (snapshot?.tables) {
          setTables(snapshot.tables);
        }
        if (snapshot?.orders) {
          setOrders(snapshot.orders);
        }
        if (snapshot?.serviceRequests) {
          setServiceRequests(snapshot.serviceRequests);
        }
      } catch (error) {
        console.warn('API snapshot unavailable, using local browser state.', error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadRemoteData();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEYS.DISHES, JSON.stringify(dishes));
    localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    localStorage.setItem(STORAGE_KEYS.SERVICE_REQUESTS, JSON.stringify(serviceRequests));
    saveRestaurantSnapshot({ dishes, tables, orders, serviceRequests }).catch(() => {});
  }, [dishes, tables, orders, serviceRequests, isHydrated]);

  // Subscribe to Cross-Tab Broadcast Events
  useEffect(() => {
    const unsubscribe = subscribeToSync((event) => {
      const { type, payload } = event;
      
      switch (type) {
        case 'PLACE_ORDER':
          setOrders((prev) => [payload.order, ...prev]);
          setTables((prev) =>
            prev.map((t) => (t.id === payload.order.tableId ? { ...t, status: 'occupied' } : t))
          );
          soundFX.playChime('new_order');
          break;

        case 'UPDATE_ORDER_STATUS':
          setOrders((prev) =>
            prev.map((o) => (o.id === payload.orderId ? { ...o, status: payload.newStatus } : o))
          );
          soundFX.playChime('status_update');
          break;

        case 'CALL_WAITER':
          setServiceRequests((prev) => [payload.request, ...prev]);
          setTables((prev) =>
            prev.map((t) => (t.id === payload.request.tableId ? { ...t, status: 'waiter_called' } : t))
          );
          soundFX.playChime('waiter_bell');
          break;

        case 'REQUEST_BILL':
          setServiceRequests((prev) => [payload.request, ...prev]);
          setTables((prev) =>
            prev.map((t) => (t.id === payload.request.tableId ? { ...t, status: 'bill_requested' } : t))
          );
          soundFX.playChime('bill_request');
          break;

        case 'RESOLVE_SERVICE':
          setServiceRequests((prev) => {
            const nextRequests = prev.map((r) => (r.id === payload.requestId ? { ...r, status: 'resolved' } : r));
            const remainingActive = nextRequests.filter(
              (r) => r.tableId === payload.tableId && r.id !== payload.requestId && r.status === 'active'
            );
            setTables((currentTables) =>
              currentTables.map((t) => (t.id === payload.tableId ? { ...t, status: remainingActive.length === 0 ? 'occupied' : t.status } : t))
            );
            return nextRequests;
          });
          break;

        case 'UPDATE_MENU':
          setDishes(payload.dishes);
          break;

        case 'RESET_DATA':
          setDishes(INITIAL_DISHES);
          setTables(INITIAL_TABLES);
          setOrders(INITIAL_ORDERS);
          setServiceRequests(INITIAL_SERVICE_REQUESTS);
          break;

        default:
          break;
      }
    });

    return () => unsubscribe();
  }, [serviceRequests]);

  // Action methods
  const setActiveTable = (tableId) => {
    setActiveTableState(tableId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      url.searchParams.set('table', tableId);
      window.history.pushState({}, '', url);
    }
  };

  const placeOrder = (cartItems, totalAmount, orderNotes = '') => {
    const tableObj = tables.find((t) => t.id === activeTable) || { name: `Table ${activeTable}` };
    const newOrder = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      tableId: activeTable,
      tableName: tableObj.name,
      createdAt: new Date().toISOString(),
      status: 'pending',
      items: cartItems,
      totalAmount,
      orderNotes,
      paymentStatus: 'unpaid'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setTables((prev) =>
      prev.map((t) => (t.id === activeTable ? { ...t, status: 'occupied' } : t))
    );

    dispatchSyncEvent('PLACE_ORDER', { order: newOrder });
    soundFX.playChime('new_order');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    dispatchSyncEvent('UPDATE_ORDER_STATUS', { orderId, newStatus });
    soundFX.playChime('status_update');
  };

  const callWaiter = (reason = 'General Assistance') => {
    const tableObj = tables.find((t) => t.id === activeTable) || { name: `Table ${activeTable}` };
    const newRequest = {
      id: `SR-${Math.floor(100 + Math.random() * 900)}`,
      tableId: activeTable,
      tableName: tableObj.name,
      type: 'call_waiter',
      reason,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    setServiceRequests((prev) => [newRequest, ...prev]);
    setTables((prev) =>
      prev.map((t) => (t.id === activeTable ? { ...t, status: 'waiter_called' } : t))
    );

    dispatchSyncEvent('CALL_WAITER', { request: newRequest });
    soundFX.playChime('waiter_bell');
  };

  const requestBill = (paymentMethod = 'Card') => {
    const tableObj = tables.find((t) => t.id === activeTable) || { name: `Table ${activeTable}` };
    const newRequest = {
      id: `SR-${Math.floor(100 + Math.random() * 900)}`,
      tableId: activeTable,
      tableName: tableObj.name,
      type: 'request_bill',
      reason: `Requesting final bill (${paymentMethod})`,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    setServiceRequests((prev) => [newRequest, ...prev]);
    setTables((prev) =>
      prev.map((t) => (t.id === activeTable ? { ...t, status: 'bill_requested' } : t))
    );

    dispatchSyncEvent('REQUEST_BILL', { request: newRequest });
    soundFX.playChime('bill_request');
  };

  const resolveServiceRequest = (requestId, tableId) => {
    setServiceRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'resolved' } : r))
    );
    
    // Check if other active requests exist for this table
    const remainingActive = serviceRequests.filter(
      (r) => r.tableId === tableId && r.id !== requestId && r.status === 'active'
    );

    if (remainingActive.length === 0) {
      setTables((prev) =>
        prev.map((t) => (t.id === tableId ? { ...t, status: 'occupied' } : t))
      );
    }

    dispatchSyncEvent('RESOLVE_SERVICE', { requestId, tableId });
  };

  const addDish = (dishData) => {
    const newDish = {
      ...dishData,
      id: `dish-${Date.now()}`,
      inStock: true
    };
    const updated = [newDish, ...dishes];
    setDishes(updated);
    dispatchSyncEvent('UPDATE_MENU', { dishes: updated });
  };

  const updateDish = (updatedDish) => {
    const updated = dishes.map((d) => (d.id === updatedDish.id ? updatedDish : d));
    setDishes(updated);
    dispatchSyncEvent('UPDATE_MENU', { dishes: updated });
  };

  const deleteDish = (dishId) => {
    const updated = dishes.filter((d) => d.id !== dishId);
    setDishes(updated);
    dispatchSyncEvent('UPDATE_MENU', { dishes: updated });
  };

  const toggleDishStock = (dishId) => {
    const updated = dishes.map((d) =>
      d.id === dishId ? { ...d, inStock: !d.inStock } : d
    );
    setDishes(updated);
    dispatchSyncEvent('UPDATE_MENU', { dishes: updated });
  };

  const resetSeedData = () => {
    setDishes(INITIAL_DISHES);
    setTables(INITIAL_TABLES);
    setOrders(INITIAL_ORDERS);
    setServiceRequests(INITIAL_SERVICE_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.DISHES);
    localStorage.removeItem(STORAGE_KEYS.TABLES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.SERVICE_REQUESTS);
    dispatchSyncEvent('RESET_DATA', {});
  };

  return (
    <RestaurantContext.Provider
      value={{
        activeView,
        setActiveView,
        activeTable,
        setActiveTable,
        dishes,
        tables,
        orders,
        serviceRequests,
        placeOrder,
        updateOrderStatus,
        callWaiter,
        requestBill,
        resolveServiceRequest,
        addDish,
        updateDish,
        deleteDish,
        toggleDishStock,
        resetSeedData
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
}
