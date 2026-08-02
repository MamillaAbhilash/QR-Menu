import React, { useState } from 'react';
import MenuManagement from './MenuManagement';
import AnalyticsDashboard from './AnalyticsDashboard';
import { Utensils, BarChart3 } from 'lucide-react';

export default function AdminView() {
  const [adminTab, setAdminTab] = useState('menu'); // 'menu', 'analytics'

  return (
    <div className="page-content">
      <div className="waiter-header">
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Restaurant Management Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Catalogue CRUD management and financial analytics.
          </p>
        </div>

        <div className="sub-tabs">
          <button
            className={`sub-tab-btn ${adminTab === 'menu' ? 'active' : ''}`}
            onClick={() => setAdminTab('menu')}
          >
            <Utensils size={15} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Menu Catalog
          </button>
          <button
            className={`sub-tab-btn ${adminTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setAdminTab('analytics')}
          >
            <BarChart3 size={15} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Sales & Analytics
          </button>
        </div>
      </div>

      {adminTab === 'menu' && <MenuManagement />}
      {adminTab === 'analytics' && <AnalyticsDashboard />}
    </div>
  );
}
