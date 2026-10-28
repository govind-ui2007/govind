import React, { useState } from 'react';
import {
  StaffUser,
  ClassStudentAttendance,
  Assignment,
  LeaveApplication,
  ExamReportCard,
} from '../../types';
import {
  CheckCircle,
  XCircle,
  Clock,
  Save,
  Users,
  Award,
  Calendar,
  FilePlus,
  FileCheck,
  Check,
  X,
  LogOut,
  AlertCircle,
  Search,
  BookOpen,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import { TimetableView } from '../dashboard/TimetableView';

interface StaffDashboardProps {
  staff: StaffUser;
  attendanceRegister: ClassStudentAttendance[];
  onUpdateAttendance: (updated: ClassStudentAttendance[]) => void;
  reportCard: ExamReportCard;
  onUpdateMarks: (updatedSubjects: ExamReportCard['subjects'], teacherRemarks: string) => void;
  assignments: Assignment[];
  onAddAssignment: (assignment: Assignment) => void;
  leaves: LeaveApplication[];
  onUpdateLeaveStatus: (leaveId: string, status: 'approved' | 'rejected') => void;
  onLogOut: () => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({
  staff,
  attendanceRegister,
  onUpdateAttendance,
  reportCard,
  onUpdateMarks,
  assignments,
  onAddAssignment,
  leaves,
  onUpdateLeaveStatus,
  onLogOut,
}) => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'marks' | 'homework' | 'leaves' | 'timetable'>('attendance');

  // Attendance Editor State
  const [currentAttendance, setCurrentAttendance] = useState<ClassStudentAttendance[]>(attendanceRegister);
  const [attendanceDate, setAttendanceDate] = useState('2026-10-28');
  const [attendanceSavedToast, setAttendanceSavedToast] = useState(false);
  const [studentSearch, setStudentSearch] = useState('');

  // Marks Editor State
  const [editingSubjects, setEditingSubjects] = useState(reportCard.subjects);
  const [editingRemarks, setEditingRemarks] = useState(reportCard.teacherRemarks);
  const [marksSavedToast, setMarksSavedToast] = useState(false);

  // Homework Publisher State
  const [hwTitle, setHwTitle] = useState('');
  const [hwSubject, setHwSubject] = useState(staff.subject.split('&')[0].trim());
  const [hwDueDate, setHwDueDate] = useState('2026-11-04');
  const [hwMaxMarks, setHwMaxMarks] = useState(25);
  const [hwDescription, setHwDescription] = useState('');
  const [hwPublishedToast, setHwPublishedToast] = useState(false);

  // Attendance editing handlers
  const handleStatusChange = (studentId: string, status: ClassStudentAttendance['status']) => {
    setCurrentAttendance((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, status } : s))
    );
  };

  const handleRemarkChange = (studentId: string, remarks: string) => {
    setCurrentAttendance((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, remarks } : s))
    );
  };

  const handleMarkAllPresent = () => {
    setCurrentAttendance((prev) =>
      prev.map((s) => ({ ...s, status: 'present' as const }))
    );
  };

  const handleSaveAttendance = () => {
    onUpdateAttendance(currentAttendance);
    setAttendanceSavedToast(true);
    setTimeout(() => setAttendanceSavedToast(false), 3000);
  };

  // Marks editing handlers
  const handleMarkChange = (index: number, field: 'obtainedTheory' | 'obtainedPractical', value: number) => {
    const updated = [...editingSubjects];
    const item = { ...updated[index] };
    if (field === 'obtainedTheory') {
      item.obtainedTheory = Math.min(item.maxTheory, Math.max(0, value));
    } else {
      item.obtainedPractical = Math.min(item.maxPractical, Math.max(0, value));
    }
    item.totalObtained = item.obtainedTheory + item.obtainedPractical;
    // Grade recalculation
    const pct = (item.totalObtained / item.totalMax) * 100;
    if (pct >= 90) item.grade = 'A1';
    else if (pct >= 80) item.grade = 'A2';
    else if (pct >= 70) item.grade = 'B1';
    else if (pct >= 60) item.grade = 'B2';
    else item.grade = 'C1';

    updated[index] = item;
    setEditingSubjects(updated);
  };

  const handleSaveMarks = () => {
    onUpdateMarks(editingSubjects, editingRemarks);
    setMarksSavedToast(true);
    setTimeout(() => setMarksSavedToast(false), 3000);
  };

  // Homework submission
  const handlePublishHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle.trim() || !hwDescription.trim()) return;

    const newAssignment: Assignment = {
      id: `asg_${Date.now()}`,
      title: hwTitle.trim(),
      subject: hwSubject,
      teacher: staff.name,
      assignedDate: '28 Oct 2026',
      dueDate: hwDueDate,
      maxMarks: hwMaxMarks,
      description: hwDescription.trim(),
      status: 'pending',
    };

    onAddAssignment(newAssignment);
    setHwTitle('');
    setHwDescription('');
    setHwPublishedToast(true);
    setTimeout(() => setHwPublishedToast(false), 3000);
  };

  const presentCount = currentAttendance.filter((s) => s.status === 'present').length;
  const absentCount = currentAttendance.filter((s) => s.status === 'absent').length;
  const lateCount = currentAttendance.filter((s) => s.status === 'late').length;
  const excusedCount = currentAttendance.filter((s) => s.status === 'excused').length;
  const attendanceRate = ((presentCount + lateCount) / currentAttendance.length) * 100;

  const filteredAttendance = currentAttendance.filter(
    (s) =>
      s.studentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.rollNo.toString().includes(studentSearch)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div className="p-4 space-y-6">
          {/* Staff Info Banner */}
          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                {staff.name.charAt(4) || 'T'}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">{staff.name}</h4>
                <p className="text-[11px] text-amber-300 font-mono truncate">{staff.assignedClass} In-charge</p>
                <p className="text-[10px] text-slate-400 font-mono">{staff.employeeId}</p>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-700/80 pt-1.5 flex items-center justify-between">
              <span>{staff.department.split('&')[0]}</span>
              <span className="text-emerald-400 font-semibold">Faculty Verified</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-1">
              Staff Privileges
            </div>

            <button
              onClick={() => setActiveTab('attendance')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'attendance'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4" />
                <span>Attendance Editor</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('marks')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'marks'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4" />
                <span>Marks & Grading Entry</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('homework')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'homework'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FilePlus className="w-4 h-4" />
                <span>Homework Publisher</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('leaves')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'leaves'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4" />
                <span>Leave Approvals</span>
              </div>
              {leaves.filter((l) => l.status === 'pending').length > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500 text-slate-900 font-bold">
                  {leaves.filter((l) => l.status === 'pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('timetable')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'timetable'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Class Timetable</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400 space-y-2">
          <div className="text-[11px] text-slate-500">
            Pathfinder Academic ERP · Staff Access
          </div>
          <button
            onClick={onLogOut}
            className="w-full py-1.5 px-3 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-200 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out from Staff Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Staff Viewport */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb & Top Bar */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800">Faculty Management Console</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-amber-800 font-semibold capitalize">
              {activeTab === 'attendance'
                ? 'Attendance Edit Register'
                : activeTab === 'marks'
                ? 'Scholastic Marks & Grading'
                : activeTab === 'homework'
                ? 'Publish Homework'
                : activeTab === 'leaves'
                ? 'Student Leave Requests'
                : 'Class Timetable'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-600 font-medium">{staff.assignedClass}</span>
            <span>·</span>
            <span>Academic Session 2025-26</span>
          </div>
        </div>

        {/* ===================== TAB 1: ATTENDANCE REGISTER ===================== */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            {/* Header Card & Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      Class Attendance Edit Register
                    </h2>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {staff.assignedClass}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any student status to edit and click 'Save Register' to update school ERP records.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <button
                    onClick={handleMarkAllPresent}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Mark All Present
                  </button>
                  <button
                    onClick={handleSaveAttendance}
                    className="px-4 py-2 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Register</span>
                  </button>
                </div>
              </div>

              {/* Attendance Day Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Enrolled</span>
                  <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    {currentAttendance.length}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <span className="text-[11px] text-emerald-800 block">Present</span>
                  <span className="text-xl font-bold font-mono text-emerald-950 tabular-nums">
                    {presentCount}
                  </span>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                  <span className="text-[11px] text-rose-800 block">Absent</span>
                  <span className="text-xl font-bold font-mono text-rose-950 tabular-nums">
                    {absentCount}
                  </span>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="text-[11px] text-amber-800 block">Late / Delayed</span>
                  <span className="text-xl font-bold font-mono text-amber-950 tabular-nums">
                    {lateCount}
                  </span>
                </div>
                <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
                  <span className="text-[11px] text-sky-800 block">Class Rate</span>
                  <span className="text-xl font-bold font-mono text-sky-950 tabular-nums">
                    {attendanceRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Controls & Filter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-slate-700">Attendance Date:</span>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="text-xs p-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800 font-mono"
                  />
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by student name or roll..."
                    className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                  />
                </div>
              </div>

              {attendanceSavedToast && (
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Class attendance register for {attendanceDate} saved successfully to school database.</span>
                </div>
              )}
            </div>

            {/* Attendance Roster Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Roll #</th>
                      <th className="py-3 px-4 font-semibold">Student Name</th>
                      <th className="py-3 px-4 font-semibold text-center">Current Status</th>
                      <th className="py-3 px-4 font-semibold text-center">Status Action Controls</th>
                      <th className="py-3 px-4 font-semibold">Staff Notes / Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAttendance.map((student) => {
                      return (
                        <tr key={student.studentId} className="hover:bg-slate-50/80">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-800 tabular-nums">
                            {student.rollNo < 10 ? `0${student.rollNo}` : student.rollNo}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {student.studentName}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {student.status === 'present' && (
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold text-xs">
                                Present
                              </span>
                            )}
                            {student.status === 'absent' && (
                              <span className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded font-semibold text-xs">
                                Absent
                              </span>
                            )}
                            {student.status === 'late' && (
                              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded font-semibold text-xs">
                                Late Arrival
                              </span>
                            )}
                            {student.status === 'excused' && (
                              <span className="px-2.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded font-semibold text-xs">
                                Excused
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                              <button
                                type="button"
                                onClick={() => handleStatusChange(student.studentId, 'present')}
                                className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                                  student.status === 'present'
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                P
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(student.studentId, 'absent')}
                                className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                                  student.status === 'absent'
                                    ? 'bg-rose-600 text-white shadow-2xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                A
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(student.studentId, 'late')}
                                className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                                  student.status === 'late'
                                    ? 'bg-amber-600 text-white shadow-2xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                Late
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(student.studentId, 'excused')}
                                className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                                  student.status === 'excused'
                                    ? 'bg-sky-600 text-white shadow-2xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                Exc
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <input
                              type="text"
                              value={student.remarks || ''}
                              onChange={(e) => handleRemarkChange(student.studentId, e.target.value)}
                              placeholder="Add reason or note..."
                              className="w-full text-xs p-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-sky-800"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: MARKS & GRADING ENTRY ===================== */}
        {activeTab === 'marks' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Scholastic Marks & Grading Console
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update student scores (Theory & Practical) and endorse official progress report card remarks.
                  </p>
                </div>

                <button
                  onClick={handleSaveMarks}
                  className="px-4 py-2 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Updated Marks</span>
                </button>
              </div>

              {marksSavedToast && (
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Exam marks and teacher remarks updated! Immediately synchronized with student report card.</span>
                </div>
              )}

              {/* Marks Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Subject & Code</th>
                      <th className="py-3 px-3 font-semibold text-center">Theory Score (Max 80)</th>
                      <th className="py-3 px-3 font-semibold text-center">Practical (Max 20)</th>
                      <th className="py-3 px-3 font-semibold text-center">Total (100)</th>
                      <th className="py-3 px-3 font-semibold text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {editingSubjects.map((sub, idx) => (
                      <tr key={sub.code} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <span className="font-mono text-slate-400 mr-2 text-[11px]">{sub.code}</span>
                          {sub.subject}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min={0}
                            max={sub.maxTheory}
                            value={sub.obtainedTheory}
                            onChange={(e) => handleMarkChange(idx, 'obtainedTheory', parseInt(e.target.value) || 0)}
                            className="w-18 p-1.5 text-center font-mono font-bold border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-sky-800"
                          />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min={0}
                            max={sub.maxPractical}
                            value={sub.obtainedPractical}
                            onChange={(e) => handleMarkChange(idx, 'obtainedPractical', parseInt(e.target.value) || 0)}
                            className="w-18 p-1.5 text-center font-mono font-bold border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-sky-800"
                          />
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold tabular-nums text-slate-900 text-sm">
                          {sub.totalObtained}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded">
                            {sub.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Remarks Editor */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Class Mentor Official Observations & Feedback:
                </label>
                <textarea
                  rows={3}
                  value={editingRemarks}
                  onChange={(e) => setEditingRemarks(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: HOMEWORK PUBLISHER ===================== */}
        {activeTab === 'homework' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Post New Homework or Project Task
              </h2>

              {hwPublishedToast && (
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>New assignment published to student portal!</span>
                </div>
              )}

              <form onSubmit={handlePublishHomework} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Assignment Title</label>
                    <input
                      type="text"
                      value={hwTitle}
                      onChange={(e) => setHwTitle(e.target.value)}
                      placeholder="e.g. Chapter 7 Ray Optics & Wave Mechanics"
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Subject</label>
                    <input
                      type="text"
                      value={hwSubject}
                      onChange={(e) => setHwSubject(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Submission Due Date</label>
                    <input
                      type="date"
                      value={hwDueDate}
                      onChange={(e) => setHwDueDate(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Maximum Marks</label>
                    <input
                      type="number"
                      value={hwMaxMarks}
                      onChange={(e) => setHwMaxMarks(parseInt(e.target.value) || 20)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Task Instructions & References</label>
                  <textarea
                    rows={3}
                    value={hwDescription}
                    onChange={(e) => setHwDescription(e.target.value)}
                    placeholder="Provide detailed instructions, rubric, and question numbers from textbook..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <FilePlus className="w-4 h-4" />
                  <span>Publish to Class</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: LEAVE APPROVALS ===================== */}
        {activeTab === 'leaves' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Student Absence & Leave Requests</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review student medical and event leave applications with one-click decision endorsements.
                </p>
              </div>

              <div className="space-y-3">
                {leaves.map((leave) => (
                  <div
                    key={leave.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-900">{leave.leaveType}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-600">
                          {leave.startDate} to {leave.endDate}
                        </span>
                        <span>·</span>
                        <span className="text-[11px] text-slate-400">Applied: {leave.appliedDate}</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1">{leave.reason}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {leave.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => onUpdateLeaveStatus(leave.id, 'approved')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => onUpdateLeaveStatus(leave.id, 'rejected')}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : (
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                            leave.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          {leave.status === 'approved' ? 'Approved' : 'Rejected'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: CLASS TIMETABLE ===================== */}
        {activeTab === 'timetable' && <TimetableView />}
      </main>
    </div>
  );
};
