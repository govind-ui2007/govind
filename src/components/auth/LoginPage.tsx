import React, { useState } from 'react';
import { Student, StaffUser } from '../../types';
import { STUDENTS_DATA, STAFF_USERS_DATA } from '../../data/mockData';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  User,
  KeyRound,
  AlertCircle,
  Building2,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

interface LoginPageProps {
  onLoginStudent: (student: Student) => void;
  onLoginStaff: (staff: StaffUser) => void;
  onBackToPublic: () => void;
  initialRole?: 'student' | 'staff';
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginStudent,
  onLoginStaff,
  onBackToPublic,
  initialRole = 'student',
}) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'staff'>(initialRole);

  // Student form state
  const [studentIdInput, setStudentIdInput] = useState('PGS-2023-1042');
  const [studentPinInput, setStudentPinInput] = useState('1042');
  const [studentError, setStudentError] = useState('');

  // Staff form state
  const [staffEmpIdInput, setStaffEmpIdInput] = useState('EMP-PGS-101');
  const [staffPasswordInput, setStaffPasswordInput] = useState('staff@pgs2026');
  const [staffError, setStaffError] = useState('');

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = studentIdInput.trim().toUpperCase();
    if (!query) {
      setStudentError('Please enter your Admission ID or Student Name');
      return;
    }
    const matched = STUDENTS_DATA.find(
      (s) =>
        s.admissionNo.toUpperCase() === query ||
        s.admissionNo.toUpperCase().includes(query) ||
        s.name.toUpperCase().includes(query)
    );

    if (matched) {
      onLoginStudent(matched);
    } else {
      // Fallback to first student for demo
      onLoginStudent(STUDENTS_DATA[0]);
    }
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = staffEmpIdInput.trim().toUpperCase();
    if (!query) {
      setStaffError('Please enter your Employee ID or School Email');
      return;
    }
    const matched = STAFF_USERS_DATA.find(
      (s) =>
        s.employeeId.toUpperCase() === query ||
        s.email.toUpperCase().includes(query) ||
        s.name.toUpperCase().includes(query)
    );

    if (matched) {
      onLoginStaff(matched);
    } else {
      // Fallback to first staff for demo
      onLoginStaff(STAFF_USERS_DATA[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_school_campus_1793205007968.jpg"
          alt="Campus backdrop"
          className="w-full h-full object-cover opacity-15 filter blur-xs"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/80" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <button
          onClick={onBackToPublic}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to School Site</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
          <Building2 className="w-4 h-4" />
          <span>Pathfinder Global School ERP Portal</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 max-w-lg mx-auto w-full px-4 my-8">
        <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="p-6 sm:p-7 bg-slate-50 border-b border-slate-200 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-950 text-white font-bold text-xl mb-3 shadow-sm">
              P
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Pathfinder Global School
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Select your role to access the integrated academic management system
            </p>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/80 rounded-xl mt-5">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('student');
                  setStudentError('');
                }}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedRole === 'student'
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Login</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('staff');
                  setStaffError('');
                }}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedRole === 'staff'
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Staff & Faculty Login</span>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-7">
            {selectedRole === 'student' ? (
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div className="bg-sky-50 border border-sky-100 p-3 rounded-lg text-xs text-sky-950 leading-relaxed">
                  <strong>Student Access Scope:</strong> You can view your real-time <strong>Attendance</strong>, term <strong>Marks & Report Cards</strong>, and class <strong>Timetable</strong>.
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Student Admission ID / Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={studentIdInput}
                      onChange={(e) => {
                        setStudentIdInput(e.target.value);
                        if (studentError) setStudentError('');
                      }}
                      placeholder="e.g. PGS-2023-1042 or Govind"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Student Access PIN
                    </label>
                    <span className="text-[11px] text-slate-400">Default: Last 4 digits of ID</span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      value={studentPinInput}
                      onChange={(e) => setStudentPinInput(e.target.value)}
                      placeholder="••••"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
                      required
                    />
                  </div>
                </div>

                {studentError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{studentError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Access Student Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* 1-Click Demo Quick Logins */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Quick 1-Click Student Demo Accounts
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onLoginStudent(STUDENTS_DATA[0])}
                      className="p-2 text-left bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-xs text-slate-900">Govind</div>
                      <div className="text-[10px] text-slate-500 font-mono">Grade 10-A · Roll #14</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => onLoginStudent(STUDENTS_DATA[1])}
                      className="p-2 text-left bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-xs text-slate-900">Ananya Patel</div>
                      <div className="text-[10px] text-slate-500 font-mono">Grade 12-B · Roll #22</div>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleStaffSubmit} className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-950 leading-relaxed">
                  <strong>Staff & Faculty Privileges:</strong> Full access to <strong>Attendance Edit Register</strong>, student <strong>Marks Grading</strong>, homework posting, and leave endorsements.
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Staff Employee ID / Official Email
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={staffEmpIdInput}
                      onChange={(e) => {
                        setStaffEmpIdInput(e.target.value);
                        if (staffError) setStaffError('');
                      }}
                      placeholder="e.g. EMP-PGS-101 or neeta.chahal@pathfinderglobal.edu.in"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Master Staff Password
                    </label>
                    <span className="text-[11px] text-slate-400">Faculty OTP Enabled</span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      value={staffPasswordInput}
                      onChange={(e) => setStaffPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
                      required
                    />
                  </div>
                </div>

                {staffError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{staffError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Sign In to Staff Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* 1-Click Demo Quick Logins */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Quick 1-Click Faculty Demo Profiles
                  </span>
                  <div className="space-y-1.5">
                    {STAFF_USERS_DATA.map((staff) => (
                      <button
                        key={staff.id}
                        type="button"
                        onClick={() => onLoginStaff(staff)}
                        className="w-full p-2.5 text-left bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-xs text-slate-900">{staff.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {staff.designation} · {staff.assignedClass}
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-sky-800">Login &rarr;</span>
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer of Card */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure 256-bit Encrypted Academic ERP Session</span>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-500">
        Pathfinder Global School · CBSE Affiliation No: 531289 · School Code: 41265
      </footer>
    </div>
  );
};
