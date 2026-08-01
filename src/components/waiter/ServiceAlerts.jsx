import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Bell, CreditCard, CheckCircle } from 'lucide-react';

export default function ServiceAlerts() {
  const { serviceRequests, resolveServiceRequest } = useRestaurant();

  const activeRequests = serviceRequests.filter((r) => r.status === 'active');

  if (activeRequests.length === 0) return null;

  return (
    <div
      style={{
        background: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid var(--primary)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-amber)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>
        <Bell size={18} className="pulse" />
        <span>ACTIVE TABLE SERVICE REQUESTS ({activeRequests.length})</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
        {activeRequests.map((req) => (
          <div
            key={req.id}
            style={{
              background: req.type === 'request_bill' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(0,0,0,0.3)',
              border: '1px solid',
              borderColor: req.type === 'request_bill' ? 'var(--accent-purple)' : 'var(--border-color)',
              borderRadius: '8px',
              padding: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800 }}>
                {req.type === 'request_bill' ? (
                  <CreditCard size={14} color="var(--accent-purple)" />
                ) : (
                  <Bell size={14} color="var(--primary)" />
                )}
                <span>{req.tableName}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {req.reason}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={() => resolveServiceRequest(req.id, req.tableId)}
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
            >
              <CheckCircle size={14} /> Clear
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
