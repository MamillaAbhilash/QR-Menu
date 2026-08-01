import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { DollarSign, ShoppingBag, TrendingUp, Users, Award } from 'lucide-react';

export default function AnalyticsDashboard() {
  const { orders, dishes, tables } = useRestaurant();

  // Metric Computations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;

  const occupiedTablesCount = tables.filter((t) => t.status !== 'available').length;
  const occupancyRate = ((occupiedTablesCount / tables.length) * 100).toFixed(0);

  // Dish popularity ranking
  const dishSalesMap = {};
  orders.forEach((ord) => {
    ord.items.forEach((item) => {
      dishSalesMap[item.name] = (dishSalesMap[item.name] || 0) + item.quantity;
    });
  });

  const topDishes = Object.entries(dishSalesMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxSalesCount = topDishes.length > 0 ? Math.max(...topDishes.map((d) => d[1])) : 1;

  // Hourly Revenue chart mock/real aggregation
  const hourlyData = [
    { hour: '12 PM', amount: 145 },
    { hour: '2 PM', amount: 230 },
    { hour: '4 PM', amount: 95 },
    { hour: '6 PM', amount: 380 },
    { hour: '8 PM', amount: 520 },
    { hour: '10 PM', amount: 290 }
  ];
  const maxHourlyAmount = Math.max(...hourlyData.map((d) => d.amount));

  return (
    <div>
      {/* KPI Cards Grid */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--primary)' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <div className="value">${totalRevenue.toFixed(2)}</div>
            <div className="label">Total System Revenue</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <div className="value">{totalOrdersCount}</div>
            <div className="label">Total Orders Placed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-indigo)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <div className="value">${avgOrderValue.toFixed(2)}</div>
            <div className="label">Average Order Value</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <div className="value">{occupancyRate}%</div>
            <div className="label">Table Occupancy Rate</div>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Hourly Revenue Bar Chart */}
        <div className="chart-card">
          <div className="chart-header">Hourly Sales Trends ($)</div>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', gap: '0.75rem', paddingTop: '1rem' }}>
            {hourlyData.map((d, i) => {
              const heightPct = (d.amount / maxHourlyAmount) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '4px' }}>
                    ${d.amount}
                  </span>
                  <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'flex-end', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '2px' }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${heightPct}%`,
                        background: 'linear-gradient(to top, var(--primary-hover), var(--primary))',
                        borderRadius: '4px',
                        transition: 'height 0.5s ease-out'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>{d.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Dishes Chart */}
        <div className="chart-card">
          <div className="chart-header">Top 5 Best-Selling Dishes</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {topDishes.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No dish order history recorded yet.</p>
            ) : (
              topDishes.map(([dishName, count], idx) => {
                const widthPct = (count / maxSalesCount) * 100;
                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 700 }}>
                        {idx + 1}. {dishName}
                      </span>
                      <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{count} Orders</span>
                    </div>

                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${widthPct}%`,
                          background: idx === 0 ? 'var(--primary)' : idx === 1 ? 'var(--accent-emerald)' : 'var(--accent-indigo)',
                          borderRadius: '4px',
                          transition: 'width 0.5s ease-out'
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
