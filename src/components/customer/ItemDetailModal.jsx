import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Plus, Minus, Check } from 'lucide-react';

export default function ItemDetailModal({ dish, isOpen, onClose, onAddToCart }) {
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (dish) {
      setSelectedVariation(dish.variations && dish.variations.length > 0 ? dish.variations[0] : null);
      setSelectedAddOns([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [dish, isOpen]);

  if (!dish) return null;

  const basePrice = dish.price + (selectedVariation ? selectedVariation.priceDelta : 0);
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = basePrice + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (addOn) => {
    if (selectedAddOns.some((a) => a.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addOn.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const handleConfirm = () => {
    const cartItem = {
      id: `${dish.id}-${Date.now()}`,
      dishId: dish.id,
      name: dish.name,
      quantity,
      unitPrice,
      totalPrice,
      selectedVariation: selectedVariation ? selectedVariation.name : null,
      addOns: selectedAddOns.map((a) => `${a.name} (+$${a.price.toFixed(2)})`),
      specialInstructions: specialInstructions.trim()
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customize Dish">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <img
            src={dish.imageUrl}
            alt={dish.name}
            style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }}
          />
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{dish.name}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {dish.description}
            </p>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.4rem' }}>
              ${dish.price.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Variations */}
        {dish.variations && dish.variations.length > 0 && (
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              CHOOSE PORTION / VARIATION
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {dish.variations.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVariation(v)}
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: selectedVariation?.id === v.id ? 'var(--primary)' : 'var(--border-color)',
                    background: selectedVariation?.id === v.id ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{v.name}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {v.priceDelta > 0 ? `+$${v.priceDelta.toFixed(2)}` : v.priceDelta < 0 ? `-$${Math.abs(v.priceDelta).toFixed(2)}` : 'Standard'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add-ons */}
        {dish.addOns && dish.addOns.length > 0 && (
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              OPTIONAL EXTRAS & ADD-ONS
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {dish.addOns.map((a) => {
                const isSelected = selectedAddOns.some((item) => item.id === a.id);
                return (
                  <div
                    key={a.id}
                    onClick={() => toggleAddOn(a)}
                    style={{
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--accent-emerald)' : 'var(--border-color)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--accent-emerald)' : 'var(--border-color)',
                          background: isSelected ? 'var(--accent-emerald)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isSelected && <Check size={12} color="white" />}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{a.name}</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      +${a.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Special Instructions */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            SPECIAL CHEF INSTRUCTIONS
          </label>
          <textarea
            className="form-textarea"
            rows="2"
            placeholder="e.g. Less spicy, sauce on the side, allergic to peanuts..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
        </div>

        {/* Quantity Controls & Add Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '0.35rem 0.75rem', borderRadius: '999px' }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <Minus size={16} />
            </button>
            <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <Plus size={16} />
            </button>
          </div>

          <button className="btn-primary" onClick={handleConfirm} style={{ padding: '0.75rem 1.5rem' }}>
            Add to Order (${totalPrice.toFixed(2)})
          </button>
        </div>
      </div>
    </Modal>
  );
}
