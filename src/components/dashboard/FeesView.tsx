import React from 'react';
import { FeeItem, Student } from '../../types';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  Receipt,
  ShieldCheck,
} from 'lucide-react';

interface FeesViewProps {
  feeItems: FeeItem[];
  student: Student;
  onOpenPayModal: (feeItem: FeeItem) => void;
}

export const FeesView: React.FC<FeesViewProps> = ({
  feeItems,
  student,
  onOpenPayModal,
}) => {
  const totalAmount = feeItems.reduce((acc, f) => acc + f.amount, 0);
  const paidAmount = feeItems
    .filter((f) => f.status === 'paid')
    .reduce((acc, f) => acc + f.amount, 0);
  const pendingAmount = feeItems
    .filter((f) => f.status !== 'paid')
    .reduce((acc, f) => acc + f.amount, 0);

  const handleDownloadReceipt = (fee: FeeItem) => {
    alert(
      `Official Fee Receipt ${fee.receiptNo || 'REC-PGS'} for ${student.name} (${fee.term}) generated. Total paid: ₹${fee.amount.toLocaleString('en-IN')}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Fee Ledger & Payment Receipts</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tuition, laboratory development, smart-class license, and transport accounts
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Pathfinder Finance ERP Bank-Integrated</span>
          </div>
        </div>

        {/* Totals Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Total Annual Dues (2025-26)
            </span>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              ₹{totalAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400">Quarterly billing cycle</span>
          </div>

          <div className="p-3.5 bg-emerald-50/60 rounded-lg border border-emerald-200">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
              Amount Paid & Cleared
            </span>
            <div className="text-xl font-bold font-mono tabular-nums text-emerald-950 mt-0.5">
              ₹{paidAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-700">Q1 & Q2 verified settled</span>
          </div>

          <div className="p-3.5 bg-amber-50/60 rounded-lg border border-amber-200">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
              Pending / Outstanding
            </span>
            <div className="text-xl font-bold font-mono tabular-nums text-amber-950 mt-0.5">
              ₹{pendingAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-amber-700">Quarter 3 due by 10 Nov 2026</span>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {feeItems.map((fee) => {
          const isPaid = fee.status === 'paid';

          return (
            <div
              key={fee.id}
              className={`bg-white rounded-xl border p-5 shadow-2xs space-y-4 transition-all ${
                isPaid ? 'border-slate-200' : 'border-amber-300 ring-1 ring-amber-100'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{fee.term}</h3>
                    <span className="font-mono text-xs text-slate-400">({fee.invoiceNo})</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isPaid ? (
                      <span className="text-emerald-700 font-medium">
                        Paid on {fee.paidDate} via {fee.paymentMethod}
                      </span>
                    ) : (
                      <span className="text-amber-800 font-medium">
                        Payment Due Date: {fee.dueDate} (No late fine before due date)
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                      ₹{fee.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase">Quarter Amount</span>
                  </div>

                  {isPaid ? (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Settled</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onOpenPayModal(fee)}
                      className="px-4 py-2 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Pay Online Now</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Itemized Breakdown Table */}
              <div className="bg-slate-50/70 rounded-lg p-3.5 border border-slate-200 text-xs">
                <span className="font-semibold text-slate-700 block mb-2 text-[11px] uppercase tracking-wider">
                  Itemized Fee Structure
                </span>
                <div className="space-y-1.5 divide-y divide-slate-200/60">
                  {fee.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between pt-1.5 text-slate-600 first:pt-0"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono tabular-nums font-medium text-slate-900">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer action / Receipt */}
              <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
                {isPaid && fee.receiptNo ? (
                  <span className="font-mono text-[11px]">Official Receipt No: {fee.receiptNo}</span>
                ) : (
                  <span className="text-[11px] text-amber-800">
                    NetBanking, UPI, Debit & Credit cards accepted without convenience charges.
                  </span>
                )}

                {isPaid && (
                  <button
                    onClick={() => handleDownloadReceipt(fee)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Download Receipt</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
