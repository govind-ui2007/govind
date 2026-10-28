import React, { useState } from 'react';
import { SchoolNotice } from '../../types';
import { Calendar, Building2, Search, ArrowRight, AlertCircle, FileText } from 'lucide-react';

interface NoticesViewProps {
  notices: SchoolNotice[];
  onOpenNoticeModal: (notice: SchoolNotice) => void;
}

export const NoticesView: React.FC<NoticesViewProps> = ({
  notices,
  onOpenNoticeModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Circulars' },
    { id: 'academic', label: 'Academic' },
    { id: 'examination', label: 'Examinations' },
    { id: 'sports', label: 'Sports & Arts' },
    { id: 'administrative', label: 'Admin & PTM' },
  ];

  const filteredNotices = notices.filter((notice) => {
    const matchesCat =
      activeCategory === 'all' ||
      notice.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Official Circulars & Notices</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified announcements from Principal, Examination Cell & Sports Directorate
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars by keyword..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
            />
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-800 text-sm">No circulars found</h3>
            <p className="text-xs text-slate-400 mt-1">
              No circulars currently match category "{activeCategory}" or query "{searchQuery}".
            </p>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-xl border p-5 shadow-2xs hover:border-slate-300 transition-all space-y-3 ${
                notice.priority === 'urgent'
                  ? 'border-l-4 border-l-rose-500'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">
                    {notice.category}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{notice.date}</span>
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{notice.issuedBy}</span>
                  </span>
                </div>

                {notice.priority === 'urgent' && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200 self-start sm:self-auto">
                    <AlertCircle className="w-3 h-3" />
                    <span>High Priority</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{notice.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {notice.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {notice.attachmentTitle ? (
                  <span className="text-slate-500 font-mono text-[11px] truncate max-w-[250px]">
                    Attached: {notice.attachmentTitle}
                  </span>
                ) : (
                  <span className="text-slate-400 text-[11px]">No external attachment</span>
                )}

                <button
                  onClick={() => onOpenNoticeModal(notice)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-sky-900 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
