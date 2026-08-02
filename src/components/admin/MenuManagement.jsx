import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { CATEGORIES } from '../../data/seedData';
import Modal from '../common/Modal';
import { Plus, Edit2, Trash2, Leaf, Sparkles, Check, ToggleLeft, ToggleRight } from 'lucide-react';

export default function MenuManagement() {
  const { dishes, addDish, updateDish, deleteDish, toggleDishStock } = useRestaurant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'soups',
    price: '',
    description: '',
    imageUrl: '',
    isVeg: true,
    isChefSpecial: false,
    prepTimeMinutes: 15
  });

  const handleOpenAdd = () => {
    setEditingDish(null);
    setFormData({
      name: '',
      category: 'soups',
      price: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isChefSpecial: false,
      prepTimeMinutes: 15
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      category: dish.category,
      price: dish.price,
      description: dish.description,
      imageUrl: dish.imageUrl,
      isVeg: dish.isVeg,
      isChefSpecial: dish.isChefSpecial,
      prepTimeMinutes: dish.prepTimeMinutes || 15
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dishPayload = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      description: formData.description,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      isVeg: formData.isVeg,
      isChefSpecial: formData.isChefSpecial,
      prepTimeMinutes: parseInt(formData.prepTimeMinutes, 10) || 15,
      variations: editingDish ? editingDish.variations : [],
      addOns: editingDish ? editingDish.addOns : []
    };

    if (editingDish) {
      updateDish({ ...dishPayload, id: editingDish.id, inStock: editingDish.inStock });
    } else {
      addDish(dishPayload);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Digital Menu Catalog</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage pricing, descriptions, stock availability, and gourmet dishes.
          </p>
        </div>

        <button className="btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Add New Dish
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {dishes.map((dish) => (
          <div
            key={dish.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              display: 'flex',
              gap: '1rem',
              position: 'relative'
            }}
          >
            <img
              src={dish.imageUrl}
              alt={dish.name}
              style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
            />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{dish.name}</h4>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                  ₹{dish.price.toFixed(2)}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.5rem 0' }}>
                Category: <strong style={{ color: 'var(--text-main)' }}>
                  {CATEGORIES.find((c) => c.id === dish.category)?.name || dish.category}
                </strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                {/* Stock Toggle */}
                <button
                  onClick={() => toggleDishStock(dish.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: dish.inStock ? 'var(--accent-emerald)' : 'var(--accent-crimson)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  {dish.inStock ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                  <span>{dish.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </button>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    className="btn-secondary"
                    onClick={() => handleOpenEdit(dish)}
                    style={{ padding: '0.3rem 0.6rem' }}
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      if (window.confirm(`Delete "${dish.name}" from menu?`)) deleteDish(dish.id);
                    }}
                    style={{ padding: '0.3rem 0.6rem' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dish Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDish ? 'Edit Dish' : 'Add New Gourmet Dish'}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>DISH TITLE</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>CATEGORY</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>PRICE (₹)</label>
              <input
                type="number"
                step="0.5"
                className="form-input"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>IMAGE URL</label>
            <input
              type="text"
              className="form-input"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>DESCRIPTION</label>
            <textarea
              className="form-textarea"
              rows="3"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={formData.isVeg}
                onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
              />
              <span>Is Vegetarian</span>
            </label>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={formData.isChefSpecial}
                onChange={(e) => setFormData({ ...formData, isChefSpecial: e.target.checked })}
              />
              <span>Chef's Special</span>
            </label>
          </div>

          <button className="btn-primary" type="submit" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            <Check size={16} /> Save Dish
          </button>
        </form>
      </Modal>
    </div>
  );
}
