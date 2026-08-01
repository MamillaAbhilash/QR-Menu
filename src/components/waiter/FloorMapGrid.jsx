import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import Modal from '../common/Modal';
import { Users, Bell, CreditCard, CheckCircle, RefreshCw } from 'lucide-react';

export default function FloorMapGrid() {
  const { tables, orders, serviceRequests, resolveServiceRequest } = useRestaurant();
  const [selectedTable, setSelectedTable] = useState(null);

  const getTableStatusDetails = (table) => {
    const tableOrders = orders.filter(
      (o) => o.tableId === table.id && o.status !== 'completed' && o.status !== 'cancelled'
    );
    const tableRequests = serviceRequests.filter(
      (r) => r.tableId === table.id && r.status === 'active'
    );
    const totalBill = tableOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    return { tableOrders, tableRequests, totalBill };
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></div>
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-indigo)' }}></div>
          <span>Occupied</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}></div>
          <span>Waiter Bell Active</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-purple)' }}></div>
          <span>Bill Requested</span>
        </div>
      </div>

      <div className="floor-grid">
        {tables.map((table) => {
          const { tableOrders, tableRequests, totalBill } = getTableStatusDetails(table);

          return (
            <div
              key={table.id}
              className={`table-card ${table.status}`}
              onClick={() => setSelectedTable(table)}
            >
              <div className="table-num">{table.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Users size={12} /> {table.capacity} Seats
              </div>

              <div className="table-status-label" style={{ marginTop: '0.2rem' }}>
                {table.status === 'waiter_called' ? (
                  <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Bell size={12} /> Bell Ringing
                  </span>
                ) : table.status === 'bill_requested' ? (
                  <span style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CreditCard size={12} /> Bill Requested
                  </span>
                ) : table.status === 'occupied' ? (
                  <span style={{ color: '#818cf8' }}>Occupied (${totalBill.toFixed(2)})</span>
                ) : (
                  <span style={{ color: 'var(--accent-emerald)' }}>Available</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Table Detail Modal */}
      {selectedTable && (
        <Modal
          isOpen={!!selectedTable}
          onClose={() => setSelectedTable(null)}
          title={`Table Overview: ${selectedTable.name}`}
        >
          {(() => {
            const { tableOrders, tableRequests, totalBill } = getTableStatusDetails(selectedTable);

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status:</span>
                    <span style={{ fontWeight: 800, textTransform: 'uppercase', marginLeft: '0.4rem', color: 'var(--primary)' }}>
                      {selectedTable.status}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Bill:</span>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-emerald)', marginLeft: '0.4rem' }}>
                      ${totalBill.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Active Service Requests */}
                {tableRequests.length > 0 && (
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                      ACTIVE SERVICE ALERTS
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {tableRequests.map((req) => (
                        <div
                          key={req.id}
                          style={{
                            background: 'rgba(245, 158, 11, 0.15)',
                            border: '1px solid var(--primary)',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{req.reason}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              Requested at {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          <button
                            className="btn-primary"
                            onClick={() => resolveServiceRequest(req.id, selectedTable.id)}
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                          >
                            <CheckCircle size={14} /> Resolve
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Orders */}
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    ACTIVE ORDERS ({tableOrders.length})
                  </h5>
                  {tableOrders.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No active orders for this table.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {tableOrders.map((ord) => (
                        <div key={ord.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                            <span>{ord.id}</span>
                            <span style={{ color: 'var(--primary)' }}>${ord.totalAmount.toFixed(2)}</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </Modal>
      )}
    </div>
  );
}
