import React, { useState } from 'react';
import {
  Student,
  Assignment,
  FeeItem,
  SchoolNotice,
  LeaveApplication,
  TeacherContact,
  StaffUser,
  ClassStudentAttendance,
  ExamReportCard,
} from './types';
import {
  STUDENTS_DATA,
  INITIAL_ASSIGNMENTS,
  FEE_ITEMS_DATA,
  SCHOOL_NOTICES,
  BUS_ROUTE_DATA,
  INITIAL_LEAVE_APPLICATIONS,
  REPORT_CARD_DATA,
  STAFF_USERS_DATA,
  INITIAL_CLASS_ATTENDANCE,
} from './data/mockData';
import { Navbar } from './components/layout/Navbar';
import { PublicPortal } from './components/public/PublicPortal';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { LoginPage } from './components/auth/LoginPage';
import { StudentSwitcherModal } from './components/modals/StudentSwitcherModal';
import { SubmitAssignmentModal } from './components/modals/SubmitAssignmentModal';
import { LeaveApplicationModal } from './components/modals/LeaveApplicationModal';
import { PayFeeModal } from './components/modals/PayFeeModal';
import { ReportCardPrintModal } from './components/modals/ReportCardPrintModal';
import { NoticeDetailModal } from './components/modals/NoticeDetailModal';
import { TeacherQueryModal } from './components/modals/TeacherQueryModal';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'login' | 'dashboard' | 'staff'>('login');
  const [initialLoginRole, setInitialLoginRole] = useState<'student' | 'staff'>('student');

  // Active Sessions
  const [activeStudent, setActiveStudent] = useState<Student>(STUDENTS_DATA[0]);
  const [activeStaff, setActiveStaff] = useState<StaffUser>(STAFF_USERS_DATA[0]);

  // Synchronized Application State
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [feeItems, setFeeItems] = useState<FeeItem[]>(FEE_ITEMS_DATA);
  const [leaves, setLeaves] = useState<LeaveApplication[]>(INITIAL_LEAVE_APPLICATIONS);
  const [notices] = useState<SchoolNotice[]>(SCHOOL_NOTICES);
  const [classAttendance, setClassAttendance] = useState<ClassStudentAttendance[]>(INITIAL_CLASS_ATTENDANCE);
  const [reportCard, setReportCard] = useState<ExamReportCard>(REPORT_CARD_DATA);

  // Modals state
  const [isStudentSwitcherOpen, setIsStudentSwitcherOpen] = useState(false);
  const [assignmentToSubmit, setAssignmentToSubmit] = useState<Assignment | null>(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [feeToPay, setFeeToPay] = useState<FeeItem | null>(null);
  const [isReportCardModalOpen, setIsReportCardModalOpen] = useState(false);
  const [noticeForDetail, setNoticeForDetail] = useState<SchoolNotice | null>(null);
  const [teacherForQuery, setTeacherForQuery] = useState<TeacherContact | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Auth Handlers
  const handleLoginStudent = (student: Student) => {
    setActiveStudent(student);
    setCurrentView('dashboard');
    showToast(`Signed in to Student Portal as ${student.name} (${student.grade}-${student.section}).`);
  };

  const handleLoginStaff = (staff: StaffUser) => {
    setActiveStaff(staff);
    setCurrentView('staff');
    showToast(`Signed in to Staff Workspace as ${staff.name} (${staff.designation}).`);
  };

  const handleLogOut = () => {
    setCurrentView('login');
    showToast('Signed out successfully. Choose Student or Staff login to continue.');
  };

  const handleGoToLogin = (role: 'student' | 'staff' = 'student') => {
    setInitialLoginRole(role);
    setCurrentView('login');
  };

  // Staff Action Handlers
  const handleUpdateClassAttendance = (updatedAttendance: ClassStudentAttendance[]) => {
    setClassAttendance(updatedAttendance);
    // Sync with Govind's attendance rate if in list
    const studentStatus = updatedAttendance.find((s) => s.studentId === activeStudent.id);
    if (studentStatus) {
      const newRate = studentStatus.status === 'present' ? 95.2 : studentStatus.status === 'late' ? 93.8 : 91.5;
      setActiveStudent((prev) => ({ ...prev, attendanceRate: newRate }));
    }
    showToast('Class attendance register updated and synchronized.');
  };

  const handleUpdateMarks = (
    updatedSubjects: ExamReportCard['subjects'],
    teacherRemarks: string
  ) => {
    const totalMax = updatedSubjects.reduce((acc, s) => acc + s.totalMax, 0);
    const totalObtained = updatedSubjects.reduce((acc, s) => acc + s.totalObtained, 0);
    const overallPercentage = parseFloat(((totalObtained / totalMax) * 100).toFixed(1));
    const avgGpa = parseFloat(
      (updatedSubjects.reduce((acc, s) => acc + s.gradePoint, 0) / updatedSubjects.length).toFixed(1)
    );

    setReportCard((prev) => ({
      ...prev,
      subjects: updatedSubjects,
      teacherRemarks,
      overallPercentage,
      cgpa: avgGpa,
    }));

    setActiveStudent((prev) => ({
      ...prev,
      currentGpa: avgGpa,
    }));

    showToast('Marks and evaluation remarks updated for report cards.');
  };

  const handleAddAssignment = (newAssignment: Assignment) => {
    setAssignments((prev) => [newAssignment, ...prev]);
    showToast(`Homework task "${newAssignment.title}" published to class.`);
  };

  const handleUpdateLeaveStatus = (leaveId: string, status: 'approved' | 'rejected') => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, status } : l))
    );
    showToast(`Leave request ${status === 'approved' ? 'approved' : 'declined'}.`);
  };

  // Student Actions
  const handleAssignmentSubmit = (assignmentId: string, fileName: string, notes: string) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              status: 'submitted',
              submittedOn: '28 Oct 2026',
              submittedFileName: fileName,
            }
          : a
      )
    );
    showToast(`Assignment successfully submitted! File "${fileName}" received.`);
  };

  const handleApplyLeave = (newLeave: LeaveApplication) => {
    setLeaves((prev) => [newLeave, ...prev]);
    showToast(`Leave application for ${newLeave.startDate} to ${newLeave.endDate} recorded.`);
  };

  const handleFeePaymentSuccess = (feeId: string, receiptNo: string, method: string) => {
    setFeeItems((prev) =>
      prev.map((f) =>
        f.id === feeId
          ? {
              ...f,
              status: 'paid',
              paidDate: '28 Oct 2026',
              paymentMethod: method,
              receiptNo: receiptNo,
            }
          : f
      )
    );
    showToast(`Payment successful! Official Receipt #${receiptNo} generated.`);
  };

  const handleSendTeacherQuery = (teacherId: string, subject: string, message: string) => {
    showToast(`Your message regarding "${subject}" was dispatched to faculty.`);
  };

  const handleUpdateStudentName = (newName: string) => {
    setActiveStudent((prev) => ({ ...prev, name: newName }));
    showToast(`Student profile updated to "${newName}".`);
  };

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-body">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar Navigation (shown on public, dashboard, and staff views) */}
      {currentView !== 'login' && (
        <Navbar
          currentView={currentView}
          onNavigateView={setCurrentView}
          activeStudent={activeStudent}
          activeStaff={activeStaff}
          onOpenStudentSwitcher={() => setIsStudentSwitcherOpen(true)}
          onSelectPublicSection={scrollToSection}
          onLogOut={handleLogOut}
        />
      )}

      {/* Main View Router */}
      {currentView === 'login' && (
        <LoginPage
          initialRole={initialLoginRole}
          onLoginStudent={handleLoginStudent}
          onLoginStaff={handleLoginStaff}
          onBackToPublic={() => setCurrentView('public')}
        />
      )}

      {currentView === 'public' && (
        <PublicPortal
          onEnterDashboard={(student) => {
            if (student) setActiveStudent(student);
            setCurrentView('dashboard');
          }}
          students={STUDENTS_DATA}
          notices={notices}
          onOpenNoticeModal={setNoticeForDetail}
          onGoToLogin={handleGoToLogin}
        />
      )}

      {currentView === 'dashboard' && (
        <StudentDashboard
          student={activeStudent}
          assignments={assignments}
          feeItems={feeItems}
          notices={notices}
          busInfo={BUS_ROUTE_DATA}
          leaves={leaves}
          onOpenStudentSwitcher={() => setIsStudentSwitcherOpen(true)}
          onExitToPublic={() => setCurrentView('public')}
          onOpenSubmitModal={setAssignmentToSubmit}
          onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
          onOpenPayModal={setFeeToPay}
          onOpenReportCardModal={() => setIsReportCardModalOpen(true)}
          onOpenNoticeModal={setNoticeForDetail}
          onOpenTeacherQuery={setTeacherForQuery}
          onUpdateStudentName={handleUpdateStudentName}
        />
      )}

      {currentView === 'staff' && (
        <StaffDashboard
          staff={activeStaff}
          attendanceRegister={classAttendance}
          onUpdateAttendance={handleUpdateClassAttendance}
          reportCard={reportCard}
          onUpdateMarks={handleUpdateMarks}
          assignments={assignments}
          onAddAssignment={handleAddAssignment}
          leaves={leaves}
          onUpdateLeaveStatus={handleUpdateLeaveStatus}
          onLogOut={handleLogOut}
        />
      )}

      {/* Modals */}
      <StudentSwitcherModal
        isOpen={isStudentSwitcherOpen}
        onClose={() => setIsStudentSwitcherOpen(false)}
        students={STUDENTS_DATA}
        currentStudent={activeStudent}
        onSelectStudent={setActiveStudent}
      />

      <SubmitAssignmentModal
        isOpen={!!assignmentToSubmit}
        onClose={() => setAssignmentToSubmit(null)}
        assignment={assignmentToSubmit}
        onSubmit={handleAssignmentSubmit}
      />

      <LeaveApplicationModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        student={activeStudent}
        onSubmitLeave={handleApplyLeave}
      />

      <PayFeeModal
        isOpen={!!feeToPay}
        onClose={() => setFeeToPay(null)}
        feeItem={feeToPay}
        student={activeStudent}
        onPaymentSuccess={handleFeePaymentSuccess}
      />

      <ReportCardPrintModal
        isOpen={isReportCardModalOpen}
        onClose={() => setIsReportCardModalOpen(false)}
        student={activeStudent}
        reportCard={reportCard}
      />

      <NoticeDetailModal
        isOpen={!!noticeForDetail}
        onClose={() => setNoticeForDetail(null)}
        notice={noticeForDetail}
      />

      <TeacherQueryModal
        isOpen={!!teacherForQuery}
        onClose={() => setTeacherForQuery(null)}
        teacher={teacherForQuery}
        student={activeStudent}
        onSendQuery={handleSendTeacherQuery}
      />
    </div>
  );
}
