import React, { useState } from 'react';
import {
  Student,
  Assignment,
  FeeItem,
  SchoolNotice,
  BusRouteInfo,
  TeacherContact,
  LeaveApplication,
} from '../../types';
import {
  LayoutDashboard,
  CalendarDays,
  CheckCircle,
  FileText,
  Award,
  CreditCard,
  Bus,
  Bell,
  GraduationCap,
  Menu,
  X,
  UserCircle2,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { OverviewView } from './OverviewView';
import { TimetableView } from './TimetableView';
import { AttendanceView } from './AttendanceView';
import { AssignmentsView } from './AssignmentsView';
import { ExamsView } from './ExamsView';
import { FeesView } from './FeesView';
import { TransportView } from './TransportView';
import { NoticesView } from './NoticesView';
import { FacultyView } from './FacultyView';

interface StudentDashboardProps {
  student: Student;
  assignments: Assignment[];
  feeItems: FeeItem[];
  notices: SchoolNotice[];
  busInfo: BusRouteInfo;
  leaves: LeaveApplication[];
  onOpenStudentSwitcher: () => void;
  onExitToPublic: () => void;
  onOpenSubmitModal: (assignment: Assignment) => void;
  onOpenLeaveModal: () => void;
  onOpenPayModal: (feeItem: FeeItem) => void;
  onOpenReportCardModal: () => void;
  onOpenNoticeModal: (notice: SchoolNotice) => void;
  onOpenTeacherQuery: (teacher: TeacherContact) => void;
  onUpdateStudentName?: (newName: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  assignments,
  feeItems,
  notices,
  busInfo,
  leaves,
  onOpenStudentSwitcher,
  onExitToPublic,
  onOpenSubmitModal,
  onOpenLeaveModal,
  onOpenPayModal,
  onOpenReportCardModal,
  onOpenNoticeModal,
  onOpenTeacherQuery,
  onUpdateStudentName,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingHomeworkCount = assignments.filter((a) => a.status === 'pending').length;
  const pendingFeeCount = feeItems.filter((f) => f.status === 'pending').length;

  // Student role is strictly restricted to Attendance, Marks & Report Card, and Timetable
  const navItems: { id: string; label: string; icon: any; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance Tracker', icon: CheckCircle },
    { id: 'exams', label: 'Marks & Report Card', icon: Award },
    { id: 'timetable', label: 'Class Timetable', icon: CalendarDays },
  ];

  const currentNav = navItems.find((n) => n.id === activeTab) || navItems[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden bg-sky-950 text-white px-4 py-3 flex items-center justify-between border-b border-sky-900 sticky top-16 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-sky-900 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold text-sm truncate">{currentNav.label}</span>
        </div>

        <button
          onClick={onOpenStudentSwitcher}
          className="flex items-center gap-1.5 text-xs bg-sky-900/80 px-2.5 py-1 rounded-md"
        >
          <span className="truncate max-w-[100px]">{student.name.split(' ')[0]}</span>
          <span className="text-sky-300">({student.grade}-{student.section})</span>
        </button>
      </div>

      {/* Sidebar Navigation (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-16 z-30 inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 h-[calc(100vh-4rem)] ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          {/* Active Student Pill Card */}
          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-800 text-sky-100 border border-sky-600 flex items-center justify-center font-bold text-sm shrink-0">
                {student.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">{student.name}</h4>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  {student.grade}-{student.section} · Roll #{student.rollNo}
                </p>
              </div>
            </div>
            <button
              onClick={onOpenStudentSwitcher}
              className="mt-2.5 w-full py-1 text-[11px] font-medium text-sky-400 hover:text-sky-300 bg-slate-700/50 hover:bg-slate-700 rounded transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
            >
              <UserCircle2 className="w-3.5 h-3.5" />
              <span>Switch Student Profile</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-1">
              Portal Modules
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-sky-900 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        isActive
                          ? 'bg-sky-800 text-white'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span>CBSE Affiliation: 531289</span>
            <span className="font-mono text-slate-500">v2.4</span>
          </div>
          <button
            onClick={onExitToPublic}
            className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit to School Site</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb Bar */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Student Portal
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{currentNav.label}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
            <span>Academic Session: {student.academicYear}</span>
            <span>·</span>
            <span>House: {student.house}</span>
          </div>
        </div>

        {/* Dynamic Tab Body */}
        {activeTab === 'overview' && (
          <OverviewView
            student={student}
            assignments={assignments}
            notices={notices}
            busInfo={busInfo}
            onNavigateTab={setActiveTab}
            onOpenSubmitModal={onOpenSubmitModal}
            onOpenNoticeModal={onOpenNoticeModal}
            onOpenReportCard={onOpenReportCardModal}
            onUpdateStudentName={onUpdateStudentName}
          />
        )}

        {activeTab === 'timetable' && <TimetableView />}

        {activeTab === 'attendance' && (
          <AttendanceView
            student={student}
            leaves={leaves}
            onOpenLeaveModal={onOpenLeaveModal}
          />
        )}

        {activeTab === 'assignments' && (
          <AssignmentsView
            assignments={assignments}
            onOpenSubmitModal={onOpenSubmitModal}
          />
        )}

        {activeTab === 'exams' && (
          <ExamsView
            student={student}
            onOpenReportCardModal={onOpenReportCardModal}
          />
        )}

        {activeTab === 'fees' && (
          <FeesView
            feeItems={feeItems}
            student={student}
            onOpenPayModal={onOpenPayModal}
          />
        )}

        {activeTab === 'transport' && (
          <TransportView busInfo={busInfo} student={student} />
        )}

        {activeTab === 'notices' && (
          <NoticesView
            notices={notices}
            onOpenNoticeModal={onOpenNoticeModal}
          />
        )}

        {activeTab === 'faculty' && (
          <FacultyView
            student={student}
            onOpenTeacherQuery={onOpenTeacherQuery}
          />
        )}
      </main>
    </div>
  );
};
