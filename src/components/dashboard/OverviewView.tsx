import React, { useState } from 'react';
import { Student, Assignment, SchoolNotice, BusRouteInfo } from '../../types';
import {
  Calendar,
  Clock,
  BookOpen,
  AlertCircle,
  Bus,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileText,
  User,
  Edit2,
  Check,
} from 'lucide-react';

interface OverviewViewProps {
  student: Student;
  assignments: Assignment[];
  notices: SchoolNotice[];
  busInfo: BusRouteInfo;
  onNavigateTab: (tab: string) => void;
  onOpenSubmitModal: (assignment: Assignment) => void;
  onOpenNoticeModal: (notice: SchoolNotice) => void;
  onOpenReportCard: () => void;
  onUpdateStudentName?: (newName: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  student,
  assignments,
  notices,
  busInfo,
  onNavigateTab,
  onOpenSubmitModal,
  onOpenNoticeModal,
  onOpenReportCard,
  onUpdateStudentName,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(student.name);
  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const urgentNotices = notices.filter((n) => n.priority === 'urgent');

  const handleSaveName = () => {
    if (editedName.trim() && onUpdateStudentName) {
      onUpdateStudentName(editedName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm border border-sky-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Student ID Monogram / Badge (Photo removed) */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-sky-800/80 border-2 border-white/20 shadow-md flex items-center justify-center text-white shrink-0">
              <User className="w-8 h-8 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-200">
                <span>Welcome back</span>
                <span>·</span>
                <span className="font-mono">{student.academicYear} Session</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-lg font-bold text-slate-900 bg-white px-2 py-0.5 rounded focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 bg-emerald-600 hover:bg-emerald-500 rounded text-white cursor-pointer"
                      title="Save name"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {student.name}
                    </h1>
                    <button
                      onClick={() => {
                        setEditedName(student.name);
                        setIsEditingName(true);
                      }}
                      className="text-sky-300 hover:text-white p-1 rounded transition-colors cursor-pointer"
                      title="Edit student name"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-2">
                <span>{student.grade} - Sec {student.section}</span>
                <span>·</span>
                <span>Roll #{student.rollNo}</span>
                <span>·</span>
                <span>{student.house} House</span>
                <span>·</span>
                <span>{student.stream}</span>
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-sky-200 block">Current Academic CGPA</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-white">
                {student.currentGpa} / 10.0
              </span>
            </div>
            <button
              onClick={onOpenReportCard}
              className="px-3.5 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-lg text-xs font-medium text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>View Report Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Strips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Monthly Attendance</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {student.attendanceRate}%
            </span>
            <span className="text-xs text-emerald-600 font-medium">Eligible (&gt;75%)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${student.attendanceRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Pending Tasks</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {pendingAssignments.length}
            </span>
            <span className="text-xs text-slate-500">Due this week</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Next: Physics & Math assignments</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">School Bus 12</span>
            <Bus className="w-4 h-4 text-sky-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900 truncate">
              {busInfo.currentStatus}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            ETA {busInfo.etaMinutes}m · {busInfo.pickupPoint.split('-')[0]}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Scholastic Standing</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              Rank #2
            </span>
            <span className="text-xs text-slate-500">in Sec A</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Honours List Distinction</p>
        </div>
      </div>

      {/* 2-Column Split: Today's Classes + Pending Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today's Class Schedule</h2>
              <p className="text-xs text-slate-500 mt-0.5">Wednesday · Regular 7-Period Timetable</p>
            </div>
            <button
              onClick={() => onNavigateTab('timetable')}
              className="text-xs font-semibold text-sky-900 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Week</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400 w-6">01</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Computer Science (Theory)</h4>
                  <p className="text-[11px] text-slate-500">Ms. Priya Menon · IT Lab 2</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono tabular-nums text-slate-600">08:30 - 09:20</span>
                <span className="block text-[10px] text-slate-400 font-medium">Completed</span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400 w-6">02</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Computer Science (Practical)</h4>
                  <p className="text-[11px] text-slate-500">Ms. Priya Menon · IT Lab 2</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono tabular-nums text-slate-600">09:20 - 10:10</span>
                <span className="block text-[10px] text-slate-400 font-medium">Completed</span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between bg-sky-50/50 -mx-5 px-5 border-l-2 border-sky-800">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-sky-900 w-6">03</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-sky-950">Mathematics & Quadratic Equations</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100/80 px-1.5 py-0.5 rounded">
                      Current Class
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-800">Mr. Vivek Saxena · Room 302</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold tabular-nums text-sky-950">10:10 - 11:00</span>
                <span className="block text-[10px] text-sky-700 font-medium">In Progress</span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400 w-6">04</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">English Core & Literature</h4>
                  <p className="text-[11px] text-slate-500">Mrs. Neeta Chahal · Room 302</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono tabular-nums text-slate-600">11:30 - 12:20</span>
                <span className="block text-[10px] text-slate-400 font-medium">After Recess</span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400 w-6">05</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Physics Practical Lab</h4>
                  <p className="text-[11px] text-slate-500">Dr. Sunita Rao · Physics Lab 1</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono tabular-nums text-slate-600">12:20 - 01:10</span>
                <span className="block text-[10px] text-slate-400 font-medium">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Homework / Deadlines (1 col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Pending Tasks</h2>
              <button
                onClick={() => onNavigateTab('assignments')}
                className="text-xs font-semibold text-sky-900 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {pendingAssignments.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-800">{item.subject}</span>
                    <span className="font-mono text-[11px] text-amber-700">Due {item.dueDate}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 mb-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-[11px] text-slate-500">Max: {item.maxMarks} marks</span>
                    <button
                      onClick={() => onOpenSubmitModal(item)}
                      className="px-2.5 py-1 bg-sky-900 text-white rounded text-[11px] font-semibold hover:bg-sky-800 transition-colors cursor-pointer"
                    >
                      Submit Work
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Notices */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Priority Circulars</h2>
              <button
                onClick={() => onNavigateTab('notices')}
                className="text-xs font-semibold text-sky-900 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Notice Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 mt-3">
              {urgentNotices.slice(0, 2).map((notice) => (
                <button
                  key={notice.id}
                  onClick={() => onOpenNoticeModal(notice)}
                  className="w-full text-left p-3 rounded-lg border border-rose-100 bg-rose-50/40 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-rose-700 font-semibold mb-1">
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{notice.category.toUpperCase()}</span>
                    </span>
                    <span className="font-mono text-slate-500 font-normal">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {notice.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                    {notice.excerpt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
