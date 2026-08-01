import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Bell, CreditCard, Droplets, Utensils, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';

export default function ServiceButtons({ onCallWaiter, onRequestBill, tableNumber }) {
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleWaiterReasonSelect = (reason) => {
    onCallWaiter(reason);
    setIsWaiterModalOpen(false);
    showToast(`Waiter bell rung for ${tableNumber}! Assisting shortly.`);
  };

  const handleBillSelect = (paymentMethod) => {
    onRequestBill(paymentMethod);
    setIsBillModalOpen(false);
    showToast(`Bill request sent for Table ${tableNumber} (${paymentMethod})!`);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className="btn-secondary"
          onClick={() => setIsWaiterModalOpen(true)}
          style={{ flex: 1, minWidth: '160px', padding: '0.75rem', justifyContent: 'center' }}
        >
          <Bell size={18} style={{ color: 'var(--primary)' }} />
          <span>Call Waiter</span>
        </button>

        <button
          className="btn-secondary"
          onClick={() => setIsBillModalOpen(true)}
          style={{ flex: 1, minWidth: '160px', padding: '0.75rem', justifyContent: 'center' }}
        >
          <CreditCard size={18} style={{ color: 'var(--accent-purple)' }} />
          <span>Request Bill</span>
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '5rem',
            right: '1.5rem',
            zIndex: 300,
            background: 'var(--primary)',
            color: 'var(--text-dark)',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px',
            fontWeight: 800,
            boxShadow: 'var(--shadow-amber)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <CheckCircle size={18} />
          {toastMessage}
        </div>
      )}

      {/* Waiter Reason Modal */}
      <Modal isOpen={isWaiterModalOpen} onClose={() => setIsWaiterModalOpen(false)} title="Call Waiter Assistance">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            Select what you need for Table {tableNumber}:
          </p>

          <button className="btn-secondary" onClick={() => handleWaiterReasonSelect('Refill Water')} style={{ justifyContent: 'flex-start', padding: '0.85rem' }}>
            <Droplets size={18} color="#38bdf8" />
            <span>Refill Drinking Water</span>
          </button>

          <button className="btn-secondary" onClick={() => handleWaiterReasonSelect('Extra Cutlery & Napkins')} style={{ justifyContent: 'flex-start', padding: '0.85rem' }}>
            <Utensils size={18} color="#f59e0b" />
            <span>Extra Cutlery & Napkins</span>
          </button>

          <button className="btn-secondary" onClick={() => handleWaiterReasonSelect('Clean Table')} style={{ justifyContent: 'flex-start', padding: '0.85rem' }}>
            <Sparkles size={18} color="#10b981" />
            <span>Clean Table & Spills</span>
          </button>

          <button className="btn-secondary" onClick={() => handleWaiterReasonSelect('General Assistance')} style={{ justifyContent: 'flex-start', padding: '0.85rem' }}>
            <HelpCircle size={18} color="#a855f7" />
            <span>General Order Assistance</span>
          </button>
        </div>
      </Modal>

      {/* Bill Method Modal */}
      <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title="Request Table Bill">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            Choose preferred payment option for Table {tableNumber}:
          </p>

          <button className="btn-secondary" onClick={() => handleBillSelect('Credit/Debit Card')} style={{ justifyContent: 'flex-start', padding: '0.85rem' }}>
            <CreditCard size={18} color="#8b5cf6" />
            <span>Credit / Debit Card Terminal</span>
          </button>

          <button className="btn-secondary" onClick={() => handleBillSelect('Cash Payment')} style={{ justifyContent: 'flex-start', padding: '0.85rem' }}>
            <CreditCard size={18} color="#10b981" />
            <span>Cash Payment</span>
          </button>

          <button className="btn-secondary" onClick={() => handleBillSelect('UPI / QR Pay')} style={{ justifyContent: 'flex-start', padding: '0.85rem' }}>
            <CreditCard size={18} color="#f59e0b" />
            <span>UPI / Digital Contactless QR Pay</span>
          </button>
        </div>
      </Modal>
    </>
  );
}
