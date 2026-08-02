import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import Modal from '../common/Modal';
import { Plus, Trash2, Send } from 'lucide-react';

export default function POSOrderModal({ isOpen, onClose }) {
  const { dishes, tables, placeOrder, setActiveTable } = useRestaurant();
  const [selectedTableId, setSelectedTableId] = useState(1);
  const [posCart, setPosCart] = useState([]);

  const handleAddItem = (dish) => {
    const existing = posCart.find((i) => i.dishId === dish.id);
    if (existing) {
      setPosCart(
        posCart.map((i) =>
          i.dishId === dish.id
            ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * i.unitPrice }
            : i
        )
      );
    } else {
      setPosCart([
        ...posCart,
        {
          id: `${dish.id}-${Date.now()}`,
          dishId: dish.id,
          name: dish.name,
          quantity: 1,
          unitPrice: dish.price,
          totalPrice: dish.price,
          selectedVariation: null,
          addOns: [],
          specialInstructions: ''
        }
      ]);
    }
  };

  const handleRemoveItem = (id) => {
    setPosCart(posCart.filter((i) => i.id !== id));
  };

  const handleConfirmPOSOrder = () => {
    if (posCart.length === 0) return;
    setActiveTable(selectedTableId);

    const total = posCart.reduce((sum, i) => sum + i.totalPrice, 0) * 1.08; // 8% tax
    placeOrder(posCart, total, 'Placed by Waiter POS');

    setPosCart([]);
    onClose();
  };

  const grandTotal = posCart.reduce((sum, i) => sum + i.totalPrice, 0) * 1.08;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="POS Direct Table Order Entry">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Table Selector */}
        <div className="form-group">
          <label>SELECT TARGET TABLE</label>
          <select
            className="form-select"
            value={selectedTableId}
            onChange={(e) => setSelectedTableId(parseInt(e.target.value, 10))}
          >
            {tables.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.status.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Quick Dish Selection List */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            SELECT MENU DISHES
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
            {dishes.filter(d => d.inStock).map((dish) => (
              <button
                key={dish.id}
                onClick={() => handleAddItem(dish)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontWeight: 600 }}>{dish.name}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>₹{dish.price.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Staged POS Cart */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            STAGED POS ITEMS ({posCart.length})
          </label>
          {posCart.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click items above to add to POS order.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '140px', overflowY: 'auto' }}>
              {posCart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                  <span>{item.quantity}x {item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{item.totalPrice.toFixed(2)}</span>
                    <button onClick={() => handleRemoveItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-crimson)', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {posCart.length > 0 && (
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
            <span>Estimated Total (Inc. Tax):</span>
            <span style={{ color: 'var(--primary)' }}>₹{grandTotal.toFixed(2)}</span>
          </div>
        )}

        <button className="btn-primary" onClick={handleConfirmPOSOrder} disabled={posCart.length === 0} style={{ width: '100%', justifyContent: 'center' }}>
          <Send size={16} /> Submit POS Order for Table {selectedTableId}
        </button>
      </div>
    </Modal>
  );
}
