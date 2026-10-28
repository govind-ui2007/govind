import React, { useState } from 'react';
import { Student, FeeItem } from '../../types';
import { X, CreditCard, ShieldCheck, CheckCircle2, QrCode, ArrowRight } from 'lucide-react';

interface PayFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feeItem: FeeItem | null;
  student: Student;
  onPaymentSuccess: (feeId: string, receiptNo: string, method: string) => void;
}

export const PayFeeModal: React.FC<PayFeeModalProps> = ({
  isOpen,
  onClose,
  feeItem,
  student,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('parent@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 9012');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !feeItem) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const receiptNo = `REC-PGS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const methodLabel = paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : paymentMethod === 'card' ? 'Credit Card' : 'Net Banking';

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(feeItem.id, receiptNo, methodLabel);
        setIsSuccess(false);
        onClose();
      }, 900);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">School Fee Online Gateway</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure Fee Portal · Pathfinder Global School
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handlePay} className="p-5 space-y-4">
          <div className="bg-sky-50/70 border border-sky-100 p-3.5 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Student: <strong>{student.name}</strong></span>
              <span>{student.grade}-{student.section}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-900">{feeItem.term}</span>
              <span className="text-lg font-bold text-sky-950 font-mono tabular-nums">
                ₹{feeItem.amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Select Payment Mode</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border flex flex-col items-center justify-center gap-1 transition-colors ${
                  paymentMethod === 'upi'
                    ? 'border-sky-800 bg-sky-50 text-sky-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border flex flex-col items-center justify-center gap-1 transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-sky-800 bg-sky-50 text-sky-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border flex flex-col items-center justify-center gap-1 transition-colors ${
                  paymentMethod === 'netbanking'
                    ? 'border-sky-800 bg-sky-50 text-sky-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>NetBanking</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'upi' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Enter UPI ID / VPA</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. mobile@upi"
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                required
              />
              <p className="text-[11px] text-slate-500">Supports Google Pay, PhonePe, Paytm, BHIM</p>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4532 0000 0000 0000"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-sky-800"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-600 block">Expiry</label>
                  <input
                    type="text"
                    defaultValue="09/29"
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 block">CVV</label>
                  <input
                    type="password"
                    defaultValue="824"
                    maxLength={4}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Select Primary Bank</label>
              <select className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-sky-800">
                <option>State Bank of India (SBI)</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Punjab National Bank (PNB)</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-Bit SSL Encrypted Bank Level Gateway · Instant Receipt</span>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || isSuccess}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Payment Confirmed!</span>
                </>
              ) : isProcessing ? (
                <span>Authorizing Bank...</span>
              ) : (
                <>
                  <span>Pay ₹{feeItem.amount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
