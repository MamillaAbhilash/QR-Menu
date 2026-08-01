import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Clock, Flame, CheckCircle, Utensils, Check } from 'lucide-react';

const COLUMNS = [
  { id: 'pending', title: 'Pending Orders', icon: Clock, color: '#f59e0b', nextStatus: 'kitchen_preparing', nextLabel: 'Start Prep' },
  { id: 'kitchen_preparing', title: 'Kitchen Preparing', icon: Flame, color: '#38bdf8', nextStatus: 'ready', nextLabel: 'Mark Ready' },
  { id: 'ready', title: 'Ready to Serve', icon: CheckCircle, color: '#10b981', nextStatus: 'served', nextLabel: 'Mark Served' },
  { id: 'served', title: 'Served / Active', icon: Utensils, color: '#8b5cf6', nextStatus: 'completed', nextLabel: 'Close Order' }
];

export default function KDSBoard() {
  const { orders, updateOrderStatus } = useRestaurant();

  const getOrdersByStatus = (statusId) => {
    return orders.filter((o) => o.status === statusId);
  };

  return (
    <div className="kds-grid">
      {COLUMNS.map((col) => {
        const Icon = col.icon;
        const columnOrders = getOrdersByStatus(col.id);

        return (
          <div key={col.id} className="kds-column">
            <div className="col-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon size={18} color={col.color} />
                <span>{col.title}</span>
              </div>
              <span className="col-badge" style={{ color: col.color, borderColor: col.color }}>
                {columnOrders.length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {columnOrders.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '2rem 0' }}>
                  No orders in {col.title.toLowerCase()}
                </div>
              ) : (
                columnOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">{order.id}</span>
                      <span className="order-table">{order.tableName}</span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Time: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>

                    <div className="order-items-list">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          <div className="order-item-row">
                            <span style={{ fontWeight: 700 }}>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                          </div>
                          {item.selectedVariation && (
                            <div className="order-item-addons">• {item.selectedVariation}</div>
                          )}
                          {item.addOns && item.addOns.length > 0 && (
                            <div className="order-item-addons">• {item.addOns.join(', ')}</div>
                          )}
                          {item.specialInstructions && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                              "{item.specialInstructions}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {order.orderNotes && (
                      <div style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.4rem', borderRadius: '4px', color: 'var(--primary)' }}>
                        Note: {order.orderNotes}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                        Total: ${order.totalAmount.toFixed(2)}
                      </span>

                      {col.nextStatus && (
                        <button
                          className="btn-primary"
                          onClick={() => updateOrderStatus(order.id, col.nextStatus)}
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                        >
                          <Check size={13} /> {col.nextLabel}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
