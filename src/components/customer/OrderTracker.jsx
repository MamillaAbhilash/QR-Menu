import React from 'react';
import { Clock, CheckCircle2, Flame, Utensils, AlertCircle } from 'lucide-react';

const STATUS_STEPS = [
  { id: 'pending', label: 'Received', icon: Clock },
  { id: 'kitchen_preparing', label: 'Preparing', icon: Flame },
  { id: 'ready', label: 'Ready', icon: CheckCircle2 },
  { id: 'served', label: 'Served', icon: Utensils }
];

export default function OrderTracker({ orders, tableNumber }) {
  const activeOrdersForTable = orders.filter(
    (o) => o.tableId === tableNumber && o.status !== 'completed' && o.status !== 'cancelled'
  );

  if (activeOrdersForTable.length === 0) return null;

  const getStepIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'kitchen_preparing': return 1;
      case 'ready': return 2;
      case 'served': return 3;
      default: return 0;
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-highlight)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-amber)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem' }}>
          <AlertCircle size={20} color="var(--primary)" />
          <span>Live Order Tracking (Table {tableNumber})</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {activeOrdersForTable.length} Active {activeOrdersForTable.length === 1 ? 'Order' : 'Orders'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {activeOrdersForTable.map((order) => {
          const currentStepIdx = getStepIndex(order.status);

          return (
            <div
              key={order.id}
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
                  {order.id}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Placed at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Progress Stepper Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  position: 'relative',
                  marginTop: '0.5rem'
                }}
              >
                {STATUS_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div
                      key={step.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem',
                        textAlign: 'center'
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: isDone
                            ? isCurrent
                              ? 'var(--primary)'
                              : 'var(--accent-emerald)'
                            : 'rgba(255, 255, 255, 0.08)',
                          color: isDone ? (isCurrent ? 'var(--text-dark)' : 'white') : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'var(--transition-normal)',
                          boxShadow: isCurrent ? 'var(--shadow-amber)' : 'none'
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: isCurrent ? 800 : 600,
                          color: isCurrent ? 'var(--primary)' : isDone ? 'var(--text-main)' : 'var(--text-muted)'
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Dish Items summary */}
              <div style={{ marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px dashed var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {order.items.map((i) => `${i.quantity}x ${i.name}`).join(' • ')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
