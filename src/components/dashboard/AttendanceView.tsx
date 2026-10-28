import React from 'react';
import { Student, LeaveApplication } from '../../types';
import {
  SUBJECT_ATTENDANCE_DATA,
  ATTENDANCE_CALENDAR_DATA,
} from '../../data/mockData';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  AlertTriangle,
} from 'lucide-react';

interface AttendanceViewProps {
  student: Student;
  leaves: LeaveApplication[];
  onOpenLeaveModal: () => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  student,
  leaves,
  onOpenLeaveModal,
}) => {
  const presentDays = ATTENDANCE_CALENDAR_DATA.filter((d) => d.status === 'present').length;
  const absentDays = ATTENDANCE_CALENDAR_DATA.filter((d) => d.status === 'absent').length;
  const lateDays = ATTENDANCE_CALENDAR_DATA.filter((d) => d.status === 'late').length;
  const excusedDays = ATTENDANCE_CALENDAR_DATA.filter((d) => d.status === 'excused').length;
  const totalSchoolDays = presentDays + absentDays + lateDays + excusedDays;

  return (
    <div className="space-y-6">
      {/* Attendance Metrics Top Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Overall Attendance</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Compliant
            </span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {student.attendanceRate}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            CBSE Minimum threshold is 75.0%
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Days Attended</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {presentDays + lateDays} / {totalSchoolDays}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Includes {lateDays} authorized delayed arrivals
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Absences Logged</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {absentDays}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {excusedDays} officially excused event leaves
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Leave Actions</span>
              <Calendar className="w-4 h-4 text-sky-800" />
            </div>
            <p className="text-xs text-slate-600">Need official school absence?</p>
          </div>
          <button
            onClick={onOpenLeaveModal}
            className="mt-2 w-full py-1.5 px-3 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply for Leave</span>
          </button>
        </div>
      </div>

      {/* Monthly Attendance Calendar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Attendance Log · October 2026
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Digital biometric & teacher roll-call synchronized daily at 08:30 AM
            </p>
          </div>
          {/* Legend */}
          <div className="flex items-center flex-wrap gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Present
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Absent
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Late/Excused
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Holiday/Weekend
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div
                key={d}
                className="text-center font-bold text-[11px] uppercase tracking-wider text-slate-400 pb-1"
              >
                {d}
              </div>
            ))}

            {/* Empty slots for month start alignment (Oct 1 2026 is Thursday -> 3 empty slots) */}
            <div className="h-14 sm:h-16 rounded-lg bg-slate-50/40 border border-transparent"></div>
            <div className="h-14 sm:h-16 rounded-lg bg-slate-50/40 border border-transparent"></div>
            <div className="h-14 sm:h-16 rounded-lg bg-slate-50/40 border border-transparent"></div>

            {ATTENDANCE_CALENDAR_DATA.map((day) => {
              let bgStyle = 'bg-slate-50 text-slate-400 border-slate-200';
              let badge = null;

              if (day.status === 'present') {
                bgStyle = 'bg-emerald-50/70 border-emerald-200 text-emerald-950';
                badge = <span className="text-[10px] text-emerald-700 font-medium">P</span>;
              } else if (day.status === 'absent') {
                bgStyle = 'bg-rose-50 border-rose-200 text-rose-950 font-bold';
                badge = <span className="text-[10px] text-rose-600 font-bold">A</span>;
              } else if (day.status === 'late' || day.status === 'excused') {
                bgStyle = 'bg-amber-50 border-amber-200 text-amber-950';
                badge = (
                  <span className="text-[10px] text-amber-700 font-semibold">
                    {day.status === 'late' ? 'Late' : 'Exc'}
                  </span>
                );
              } else if (day.status === 'holiday') {
                bgStyle = 'bg-sky-50/50 border-sky-200 text-sky-800';
                badge = <span className="text-[10px] text-sky-600 font-medium">Off</span>;
              }

              return (
                <div
                  key={day.date}
                  className={`p-2 rounded-lg border text-left flex flex-col justify-between h-14 sm:h-16 transition-all hover:shadow-xs group relative ${bgStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">{day.dayNumber}</span>
                    {badge}
                  </div>
                  {day.remarks && (
                    <span className="text-[9px] truncate text-slate-500 group-hover:text-slate-800">
                      {day.remarks}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Subject-Wise Attendance Breakdown
          </h3>
          <span className="text-xs text-slate-500 font-mono">Current Semester 2025-26</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Subject</th>
                <th className="py-2.5 px-4 font-semibold text-center">Conducted</th>
                <th className="py-2.5 px-4 font-semibold text-center">Attended</th>
                <th className="py-2.5 px-4 font-semibold text-center">Percentage</th>
                <th className="py-2.5 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SUBJECT_ATTENDANCE_DATA.map((row) => (
                <tr key={row.subject} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-bold text-slate-900">{row.subject}</td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-600">
                    {row.totalClasses}
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-600">
                    {row.attended}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.percentage >= 90
                              ? 'bg-emerald-500'
                              : row.percentage >= 75
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="font-mono font-semibold tabular-nums text-slate-800">
                        {row.percentage}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {row.status === 'Safe' ? (
                      <span className="text-xs text-emerald-700 font-medium">Safe</span>
                    ) : (
                      <span className="text-xs text-amber-700 font-medium flex items-center justify-end gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Warning</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Application History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Recent Leave Applications & Approvals
          </h3>
          <button
            onClick={onOpenLeaveModal}
            className="text-xs font-semibold text-sky-900 hover:text-sky-800 cursor-pointer"
          >
            + New Leave Application
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {leaves.map((leave) => (
            <div
              key={leave.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{leave.leaveType}</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-mono text-slate-500">
                    {leave.startDate} to {leave.endDate}
                  </span>
                </div>
                <p className="text-slate-600 mt-1">{leave.reason}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-slate-400 text-[11px] font-mono">
                  Applied: {leave.appliedDate}
                </span>
                {leave.status === 'approved' ? (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Approved by Principal
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Under Teacher Review</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
