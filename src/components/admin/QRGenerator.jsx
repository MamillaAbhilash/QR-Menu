import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { generateQRCodeSVG, downloadQRCode } from '../../utils/qrcode';
import { Download, QrCode, ExternalLink, Printer } from 'lucide-react';

export default function QRGenerator() {
  const { tables } = useRestaurant();

  const handlePrintAll = () => {
    window.print();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Table QR Code Generator</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Client-side SVG QR Code generator linking directly to customer table ordering screens.
          </p>
        </div>

        <button className="btn-secondary" onClick={handlePrintAll}>
          <Printer size={16} /> Print Table QR Sheets
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {tables.map((table) => {
          const targetUrl = `${window.location.origin}/?table=${table.id}`;
          const qrSvgHtml = generateQRCodeSVG(targetUrl, 180);

          return (
            <div
              key={table.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                {table.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Capacity: {table.capacity} Guests
              </div>

              {/* Rendered SVG QR code */}
              <div
                dangerouslySetInnerHTML={{ __html: qrSvgHtml }}
                style={{ marginBottom: '1rem' }}
              />

              <div style={{ fontSize: '0.7rem', color: 'var(--primary)', wordBreak: 'break-all', marginBottom: '1rem', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px' }}>
                {targetUrl}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                <button
                  className="btn-secondary"
                  onClick={() => downloadQRCode(table.name, targetUrl)}
                  style={{ flex: 1, justifyContent: 'center', padding: '0.4rem', fontSize: '0.75rem' }}
                >
                  <Download size={13} /> SVG QR
                </button>
                <a
                  href={`/?table=${table.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ justifyContent: 'center', padding: '0.4rem', textDecoration: 'none' }}
                  title="Open Customer View for this Table"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
