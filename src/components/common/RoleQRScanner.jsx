import React, { useMemo, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useRestaurant } from '../../context/RestaurantContext';
import { generateQRCodeSVG } from '../../utils/qrcode';
import { ScanLine, ArrowRight, Keyboard, Copy, QrCode } from 'lucide-react';

const ROLE_OPTIONS = [
  { value: 'customer', label: 'Customer' },
  { value: 'waiter', label: 'Waiter' },
  { value: 'admin', label: 'Admin' }
];

export default function RoleQRScanner({ roleLabel = 'Universal', targetView = 'customer', helperText = 'Scan a QR link to launch any module.', accentColor = 'var(--primary)' }) {
  const { activeTable, setActiveTable, setActiveView } = useRestaurant();
  const [scanInput, setScanInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedRole, setSelectedRole] = useState(targetView);

  const applyScanValue = (value) => {
    const text = value.trim();
    let parsedTable = null;
    let resolvedView = selectedRole;

    if (/^\d+$/.test(text)) {
      parsedTable = parseInt(text, 10);
    } else if (text) {
      try {
        const parsedUrl = new URL(text.includes('://') ? text : `https://${text}`);
        const tableParam = parsedUrl.searchParams.get('table');
        const viewParam = parsedUrl.searchParams.get('view');

        if (tableParam && !Number.isNaN(parseInt(tableParam, 10))) {
          parsedTable = parseInt(tableParam, 10);
        }

        if (viewParam && ['customer', 'waiter', 'admin'].includes(viewParam)) {
          resolvedView = viewParam;
        }
      } catch {
        parsedTable = null;
      }
    }

    if (!parsedTable || parsedTable < 1 || parsedTable > 12) {
      setFeedback('Scan a valid table QR or enter a table number from 1–12.');
      return;
    }

    setActiveTable(parsedTable);
    setActiveView(resolvedView);
    setFeedback(`${resolvedView.charAt(0).toUpperCase() + resolvedView.slice(1)} module opened for Table ${parsedTable}.`);

    const url = new URL(window.location.href);
    url.searchParams.set('view', resolvedView);
    url.searchParams.set('table', parsedTable);
    window.history.replaceState({}, '', url);
    setScanInput('');
  };

  const handleScanSubmit = (event) => {
    event.preventDefault();
    applyScanValue(scanInput);
  };

  const scannerKey = useMemo(() => `universal-${selectedRole}-${activeTable}`, [selectedRole, activeTable]);
  const qrTargetUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.searchParams.set('view', selectedRole);
    url.searchParams.set('table', activeTable);
    return url.toString();
  }, [activeTable, selectedRole]);

  const copyLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(qrTargetUrl);
      setFeedback(`QR link for ${selectedRole} copied.`);
    }
  };

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.1rem',
        marginBottom: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: `${accentColor}22`,
              color: accentColor
            }}
          >
            <ScanLine size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{roleLabel} QR Launcher</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{helperText}</div>
          </div>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Current selection: Table {activeTable}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Launch module
          <select
            className="form-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ marginTop: '0.3rem', minWidth: '140px' }}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Table
          <input
            className="form-input"
            type="number"
            min="1"
            max="12"
            value={activeTable}
            onChange={(e) => setActiveTable(Number(e.target.value) || 1)}
            style={{ marginTop: '0.3rem', width: '90px' }}
          />
        </label>
      </div>

      <div
        style={{
          border: '1px dashed var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.2)'
        }}
      >
        {typeof window !== 'undefined' && window.isSecureContext ? (
          <Scanner
            key={scannerKey}
            onScan={(result) => {
              if (result?.[0]?.rawValue) {
                applyScanValue(result[0].rawValue);
              }
            }}
            onError={(error) => {
              console.warn('QR scan error', error);
              setFeedback('Camera access is blocked or unavailable. You can still open a module using the QR code below or by typing a table number.');
            }}
            formats={['qr_code']}
            constraints={{ facingMode: 'environment' }}
            scanDelay={1000}
            styles={{ container: { width: '100%' }, video: { width: '100%', objectFit: 'cover' } }}
          />
        ) : (
          <div style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Universal QR launcher</div>
            <div style={{ fontSize: '0.85rem', maxWidth: '420px' }}>
              Open this app on localhost or HTTPS for live camera scanning, or use the QR below to launch the selected module on your phone.
            </div>
            <div dangerouslySetInnerHTML={{ __html: generateQRCodeSVG(qrTargetUrl, 220) }} />
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={copyLink} type="button">
                <Copy size={14} /> Copy link
              </button>
              <button className="btn-primary" onClick={() => setActiveView(selectedRole)} type="button">
                <QrCode size={14} /> Open {selectedRole}
              </button>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleScanSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
        <input
          className="form-input"
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          placeholder="Or paste a QR URL or enter a table number"
          style={{ minWidth: '260px', flex: 1 }}
        />

        <button className="btn-primary" type="submit" style={{ whiteSpace: 'nowrap' }}>
          <ScanLine size={15} /> Open Module
        </button>
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.78rem', color: feedback.includes('opened') || feedback.includes('copied') ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
          {feedback || 'Select a module, then scan or open the generated QR from your phone.'}
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <Keyboard size={13} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
          Type a table number or scan a QR link <ArrowRight size={13} style={{ verticalAlign: 'middle' }} />
        </span>
      </div>
    </div>
  );
}
