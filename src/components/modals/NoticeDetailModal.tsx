import React from 'react';
import { SchoolNotice } from '../../types';
import { X, Calendar, Download, Building2 } from 'lucide-react';

interface NoticeDetailModalProps {
  notice: SchoolNotice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !notice) return null;

  const handleDownloadAttachment = () => {
    alert(`Downloading attachment: ${notice.attachmentTitle || 'Circular_Document.pdf'}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-sky-800 tracking-wider">
              {notice.category} circular
            </span>
            {notice.priority === 'urgent' && (
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Priority Notice
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {notice.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{notice.date}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Issued by {notice.issuedBy}</span>
              </span>
            </div>
          </div>

          <div className="text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-lg border border-slate-200 whitespace-pre-line">
            {notice.content}
          </div>

          {notice.attachmentTitle && (
            <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded bg-sky-50 text-sky-900 flex items-center justify-center font-bold text-xs shrink-0">
                  PDF
                </div>
                <div className="truncate">
                  <p className="text-xs font-medium text-slate-900 truncate">
                    {notice.attachmentTitle}
                  </p>
                  <p className="text-[11px] text-slate-400">Official Notice Annexure</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadAttachment}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
