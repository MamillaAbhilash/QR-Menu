import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Trash2, ShoppingBag, Send } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onDispatchOrder, tableNumber }) {
  const [orderNotes, setOrderNotes] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const grandTotal = subtotal + tax;

  const handleCheckout = () => {
    onDispatchOrder(cartItems, grandTotal, orderNotes);
    setOrderNotes('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Your Order (Table ${tableNumber})`}>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Your cart is empty</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.4rem' }}>
            Select gourmet dishes from our digital menu to place an order.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Cart items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '280px', overflowY: 'auto' }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '0.85rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.name}</div>
                  {item.selectedVariation && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>
                      Portion: {item.selectedVariation}
                    </div>
                  )}
                  {item.addOns && item.addOns.length > 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      + {item.addOns.join(', ')}
                    </div>
                  )}
                  {item.specialInstructions && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontStyle: 'italic' }}>
                      Note: "{item.specialInstructions}"
                    </div>
                  )}
                  <div style={{ fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-crimson)', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table notes */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              GENERAL TABLE INSTRUCTIONS
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Serve drinks together, extra cutleries please..."
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
            />
          </div>

          {/* Summary Breakdown */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Estimated Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', borderTop: '1px dashed var(--border-color)', pt: '0.5rem', marginTop: '0.2rem' }}>
              <span>Grand Total</span>
              <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Action */}
          <button className="btn-primary" onClick={handleCheckout} style={{ width: '100%', padding: '0.85rem', justifyContent: 'center' }}>
            <Send size={18} />
            Send Order to Kitchen (Table {tableNumber})
          </button>
        </div>
      )}
    </Modal>
  );
}
