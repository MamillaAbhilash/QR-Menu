import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { CATEGORIES } from '../../data/seedData';
import ItemDetailModal from './ItemDetailModal';
import CartDrawer from './CartDrawer';
import OrderTracker from './OrderTracker';
import ServiceButtons from './ServiceButtons';
import { Search, ShoppingBag, Plus, Sparkles, Flame, Clock, Leaf } from 'lucide-react';

export default function CustomerView() {
  const {
    dishes,
    tables,
    orders,
    activeTable,
    setActiveTable,
    placeOrder,
    callWaiter,
    requestBill
  } = useRestaurant();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);

  // Staged Cart items in local component state
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Customizing dish modal state
  const [selectedDishForModal, setSelectedDishForModal] = useState(null);

  // Filter dishes
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = isVegOnly ? dish.isVeg : true;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  const handleAddToCart = (newItem) => {
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleUpdateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.id === cartItemId) {
            const unitPrice = item.totalPrice / item.quantity;
            return { ...item, quantity: newQty, totalPrice: unitPrice * newQty };
          }
          return item;
        })
      );
    }
  };

  const handleRemoveCartItem = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleDispatchOrder = (items, total, notes) => {
    placeOrder(items, total, notes);
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="page-content">
      {/* Table Switcher Simulator Bar */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
            TABLE SELECTION SIMULATOR:
          </span>
          <select
            className="form-select"
            value={activeTable}
            onChange={(e) => setActiveTable(parseInt(e.target.value, 10))}
            style={{ width: 'auto', fontWeight: 700, padding: '0.4rem 0.8rem' }}
          >
            {tables.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} (Capacity: {t.capacity} guests)
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Active URL param: <code style={{ color: 'var(--primary)', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>?table={activeTable}</code>
        </div>
      </div>

      {/* Hero Header */}
      <section className="customer-hero">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>Digital Culinary Menu</span>
          </div>
          <h1 className="hero-title">Experience Flavors at Table {activeTable}</h1>
          <p className="hero-subtitle">
            Browse our artisanal dishes, customize ingredients, and send direct orders to the kitchen instantly.
          </p>

          <ServiceButtons
            onCallWaiter={callWaiter}
            onRequestBill={requestBill}
            tableNumber={activeTable}
          />
        </div>
      </section>

      {/* Live Tracker Banner if active orders exist */}
      <OrderTracker orders={orders} tableNumber={activeTable} />

      {/* Category Pills & Search Filter */}
      <div className="filter-bar">
        <div className="category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="filter-controls">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isVegOnly}
              onChange={(e) => setIsVegOnly(e.target.checked)}
              style={{ accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
            />
            <Leaf size={16} color="var(--accent-emerald)" />
            <span>Veg Only</span>
          </label>
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="dishes-grid">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className={`dish-card ${!dish.inStock ? 'out-of-stock' : ''}`}>
            <div className="dish-image-wrapper">
              <img src={dish.imageUrl} alt={dish.name} className="dish-image" />
              
              <div className="dietary-badges">
                {dish.isVeg ? (
                  <span className="badge badge-veg">
                    <Leaf size={10} /> VEG
                  </span>
                ) : (
                  <span className="badge badge-nonveg">NON-VEG</span>
                )}
                {dish.isChefSpecial && (
                  <span className="badge badge-special">
                    <Sparkles size={10} /> CHEF CHOICE
                  </span>
                )}
              </div>

              {!dish.inStock && <div className="badge-out">SOLD OUT</div>}
            </div>

            <div className="dish-content">
              <div className="dish-header">
                <h3 className="dish-title">{dish.name}</h3>
                <span className="dish-price">${dish.price.toFixed(2)}</span>
              </div>

              <p className="dish-desc">{dish.description}</p>

              <div className="dish-footer">
                <span className="prep-time">
                  <Clock size={13} /> {dish.prepTimeMinutes} mins
                </span>

                {dish.inStock && (
                  <button
                    className="btn-primary"
                    onClick={() => setSelectedDishForModal(dish)}
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <Plus size={14} /> Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Launcher Bar */}
      {totalCartCount > 0 && (
        <div className="cart-floating-bar" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer' }}>
          <div className="cart-info">
            <div className="cart-badge-count">{totalCartCount}</div>
            <div className="cart-total-text">
              <span className="label">Table {activeTable} Order Staged</span>
              <span className="amount">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          <button className="btn-primary" style={{ pointerEvents: 'none' }}>
            <ShoppingBag size={16} /> View Order Cart
          </button>
        </div>
      )}

      {/* Item Customization Modal */}
      <ItemDetailModal
        dish={selectedDishForModal}
        isOpen={!!selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onDispatchOrder={handleDispatchOrder}
        tableNumber={activeTable}
      />
    </div>
  );
}
