import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { UtensilsCrossed, UserCheck, ShieldCheck, ExternalLink, RotateCcw } from 'lucide-react';

export default function Navbar() {
  const { activeView, setActiveView, activeTable, resetSeedData } = useRestaurant();

  const openNewWindow = (viewType) => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', viewType);
    if (viewType === 'customer') {
      url.searchParams.set('table', activeTable);
    }
    window.open(url.toString(), '_blank');
  };

  return (
    <header className="navbar">
      <div className="brand-logo">
        <div className="brand-icon">
          <UtensilsCrossed size={22} />
        </div>
        <div>
          <div>Gourmet QR Menu</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>
            Multi-Module Live Sync
          </div>
        </div>
      </div>

      <nav className="view-switcher">
        <button
          className={`view-btn ${activeView === 'customer' ? 'active' : ''}`}
          onClick={() => setActiveView('customer')}
        >
          <UtensilsCrossed size={16} />
          Customer Menu
        </button>

        <button
          className={`view-btn ${activeView === 'waiter' ? 'active' : ''}`}
          onClick={() => setActiveView('waiter')}
        >
          <UserCheck size={16} />
          Waiter KDS
        </button>

        <button
          className={`view-btn ${activeView === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveView('admin')}
        >
          <ShieldCheck size={16} />
          Admin Portal
        </button>
      </nav>

      <div className="nav-actions">
        <button
          className="btn-secondary"
          onClick={() => openNewWindow(activeView)}
          title="Open current view in a new browser tab for live multi-screen simulation"
        >
          <ExternalLink size={15} />
          <span style={{ fontSize: '0.8rem' }}>Pop-out Tab</span>
        </button>

        <button
          className="btn-secondary"
          onClick={() => {
            if (window.confirm('Reset all restaurant data to default seed menu & mock state?')) {
              resetSeedData();
            }
          }}
          title="Reset to default seed dataset"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </header>
  );
}
