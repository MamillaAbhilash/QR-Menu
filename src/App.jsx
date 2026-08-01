import React, { useEffect } from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import Navbar from './components/common/Navbar';
import CustomerView from './components/customer/CustomerView';
import WaiterView from './components/waiter/WaiterView';
import AdminView from './components/admin/AdminView';

function MainRouter() {
  const { activeView, setActiveView, setActiveTable } = useRestaurant();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const tableParam = params.get('table');

      if (viewParam && ['customer', 'waiter', 'admin'].includes(viewParam)) {
        setActiveView(viewParam);
      }
      if (tableParam && !isNaN(tableParam)) {
        setActiveTable(parseInt(tableParam, 10));
      }
    }
  }, [setActiveView, setActiveTable]);

  return (
    <div className="app-container">
      <Navbar />
      {activeView === 'customer' && <CustomerView />}
      {activeView === 'waiter' && <WaiterView />}
      {activeView === 'admin' && <AdminView />}
    </div>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <MainRouter />
    </RestaurantProvider>
  );
}
