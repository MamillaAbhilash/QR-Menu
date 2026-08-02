import React, { useState } from 'react';
import KDSBoard from './KDSBoard';
import FloorMapGrid from './FloorMapGrid';
import ServiceAlerts from './ServiceAlerts';
import POSOrderModal from './POSOrderModal';
import { LayoutGrid, Map, Plus } from 'lucide-react';

export default function WaiterView() {
  const [subTab, setSubTab] = useState('kds'); // 'kds' or 'floormap'
  const [isPosOpen, setIsPosOpen] = useState(false);

  return (
    <div className="page-content">
      {/* Service Alert Queue */}
      <ServiceAlerts />

      <div className="waiter-header">
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Waiter Operations & KDS Hub</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Real-time kitchen order dispatch, table status monitoring, and instant service alerts.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="sub-tabs">
            <button
              className={`sub-tab-btn ${subTab === 'kds' ? 'active' : ''}`}
              onClick={() => setSubTab('kds')}
            >
              <LayoutGrid size={15} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              KDS Order Stream
            </button>
            <button
              className={`sub-tab-btn ${subTab === 'floormap' ? 'active' : ''}`}
              onClick={() => setSubTab('floormap')}
            >
              <Map size={15} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Visual Floor Map
            </button>
          </div>

          <button className="btn-primary" onClick={() => setIsPosOpen(true)}>
            <Plus size={16} /> POS New Order
          </button>
        </div>
      </div>

      {subTab === 'kds' ? <KDSBoard /> : <FloorMapGrid />}

      {/* POS Direct Entry Modal */}
      <POSOrderModal isOpen={isPosOpen} onClose={() => setIsPosOpen(false)} />
    </div>
  );
}
