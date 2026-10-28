import React, { useState } from 'react';
import { Weekday, TimetablePeriod } from '../../types';
import { TIMETABLE_DATA } from '../../data/mockData';
import { Clock, MapPin, User, CalendarDays, Search } from 'lucide-react';

export const TimetableView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Weekday>('Monday');
  const [searchQuery, setSearchQuery] = useState('');

  const weekdays: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daySchedule = TIMETABLE_DATA[selectedDay] || [];

  const filteredSchedule = daySchedule.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Weekly Academic Timetable</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Grade 10-A · CBSE Curriculum Schedule · Academic Session 2025-2026
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by subject or teacher..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
            />
          </div>
        </div>

        {/* Day Selector Segmented Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1">
          {weekdays.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule Table / Cards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-sky-900" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {selectedDay} Schedule ({filteredSchedule.length} slots)
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">School Bell Hours: 08:30 AM - 03:30 PM</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredSchedule.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No classes match your filter criteria "{searchQuery}" on {selectedDay}.
            </div>
          ) : (
            filteredSchedule.map((period, index) => {
              if (period.isBreak) {
                return (
                  <div
                    key={`${selectedDay}-break-${index}`}
                    className="py-3 px-5 bg-amber-50/50 flex items-center justify-between text-xs text-amber-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{period.subject}</span>
                      <span className="text-amber-700/80">·</span>
                      <span className="text-[11px] text-amber-700">{period.room}</span>
                    </div>
                    <span className="font-mono text-[11px] text-amber-800 font-medium">
                      {period.timeRange}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={`${selectedDay}-${period.periodNumber}-${index}`}
                  className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-900 font-bold font-mono text-sm flex items-center justify-center border border-sky-100 shrink-0">
                      P{period.periodNumber}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {period.subject}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{period.teacher}</span>
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{period.room}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <span className="flex items-center gap-1 text-xs font-mono font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{period.timeRange}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">50 minutes</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
