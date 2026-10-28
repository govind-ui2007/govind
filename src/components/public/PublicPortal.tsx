import React, { useState } from 'react';
import { Student, SchoolNotice } from '../../types';
import {
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Award,
  Bus,
  Cpu,
  Trophy,
  Calendar,
  CheckCircle2,
  Users,
  MapPin,
  Phone,
  Mail,
  UserCheck,
} from 'lucide-react';

interface PublicPortalProps {
  onEnterDashboard: (student?: Student) => void;
  students: Student[];
  notices: SchoolNotice[];
  onOpenNoticeModal: (notice: SchoolNotice) => void;
  onGoToLogin?: (role?: 'student' | 'staff') => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({
  onEnterDashboard,
  students,
  notices,
  onOpenNoticeModal,
  onGoToLogin,
}) => {
  const [inputAdmissionNo, setInputAdmissionNo] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputAdmissionNo.trim().toUpperCase();
    if (!query) {
      setLoginError('Please enter an Admission No or Student Name');
      return;
    }
    const found = students.find(
      (s) =>
        s.admissionNo.toUpperCase().includes(query) ||
        s.name.toUpperCase().includes(query)
    );
    if (found) {
      onEnterDashboard(found);
    } else {
      // Log in with primary demo student with notice
      onEnterDashboard(students[0]);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with Split Campus Photography & Quick Portal Login */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Scrim & Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_school_campus_1793205007968.jpg"
            alt="Pathfinder Global School Campus Architecture"
            className="w-full h-full object-cover object-center opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Pitch (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-400">
                <span>CBSE Affiliated Senior Secondary School</span>
                <span>·</span>
                <span className="font-mono">Code: 41265</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Nurturing Visionaries, Leaders & Global Achievers
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Welcome to Pathfinder Global School. Empowering students with cutting-edge STEM laboratories, world-class athletic infrastructure, and academic mentorship.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onGoToLogin ? onGoToLogin('student') : onEnterDashboard(students[0])}
                  className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Student Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onGoToLogin ? onGoToLogin('staff') : null}
                  className="px-5 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Staff & Faculty Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>100% CBSE Board Pass Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>Robotics & Innovation Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-sky-400" />
                  <span>State Athletic Champions</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Direct Portal Login Box (5 cols) */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Student & Parent ERP</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Access attendance, timetable, results & fee receipts
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 flex items-center justify-center font-bold text-sm">
                  ERP
                </div>
              </div>

              {/* 1-Click Demo Profiles */}
              <div className="mt-5 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Quick Access Demo Profiles
                </span>

                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => onEnterDashboard(student)}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-sky-800 hover:bg-sky-50/50 transition-all flex items-center gap-3.5 text-left cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-sky-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-sky-900 truncate">
                          {student.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-900 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        {student.admissionNo} · {student.grade}-{student.section}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Admission No Form */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <form onSubmit={handleCustomLogin} className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Or Enter Student Admission ID
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. PGS-2023-1042"
                      value={inputAdmissionNo}
                      onChange={(e) => {
                        setInputAdmissionNo(e.target.value);
                        if (loginError) setLoginError('');
                      }}
                      className="flex-1 text-xs px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Login
                    </button>
                  </div>
                  {loginError && <p className="text-xs text-rose-600">{loginError}</p>}
                </form>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Class Teacher Mentor: Mrs. Neeta Chahal</span>
                <span className="font-mono text-slate-400">AY 2025-26</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Statistics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-sky-950">
              100%
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
              CBSE Class 10 & 12 Pass Rate
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-sky-950">
              24:1
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
              Student-Teacher Mentorship Ratio
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-sky-950">
              14+
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
              Specialized STEM & Robotics Labs
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-sky-950">
              42+
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
              GPS Safe Transit Bus Routes
            </p>
          </div>
        </div>
      </section>

      {/* Academic Pillars & Campus Life */}
      <section id="academics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
            Pathfinder Educational Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Excellence Across Every Academic Dimension
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Rigorous curriculum aligned with the National Education Policy, integrating experiential learning with global standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-900 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">CBSE Scholastic Curriculum</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprehensive pedagogical coverage from Foundation years through Senior Secondary streams in Science, Commerce, and Humanities.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-900 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Robotics & Innovation Lab</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hands-on electronics, Python programming, IoT sensors, and drone flight mechanics mentored by industry researchers.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-900 flex items-center justify-center font-bold">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AIS-140 Safe Transit Fleet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Air-conditioned school buses equipped with real-time GPS tracking, speed governors, CCTV cameras, and trained female attendants.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Athletic Complex Showcase */}
      <section id="facilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 text-white grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px]">
            <img
              src="/src/assets/images/school_sports_facility_1793205009451.jpg"
              alt="Pathfinder Sports Arena & Running Track"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              World-Class Athletic Arena
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Olympic-Grade Running Track & Sports Complex
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our 8-lane synthetic all-weather running track, FIFA-standard football pitch, indoor badminton courts, and shooting range foster physical vigor, teamwork, and national-level sports champions.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Inter-School Championships</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Certified NIS Coaches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Circulars & Official Notices Section */}
      <section id="circulars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Administrative Bulletin
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
              Latest Circulars & School Notices
            </h2>
          </div>

          <button
            onClick={() => onEnterDashboard(students[0])}
            className="text-xs font-semibold text-sky-900 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All in Student Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold uppercase text-sky-900 tracking-wider">
                    {notice.category}
                  </span>
                  <span className="font-mono">{notice.date}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {notice.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1.5">
                  {notice.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">By {notice.issuedBy}</span>
                <button
                  onClick={() => onOpenNoticeModal(notice)}
                  className="text-sky-900 font-semibold hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Notice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Admissions & Contact Desk */}
      <section id="admissions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="contact" className="bg-sky-950 text-white rounded-2xl p-8 sm:p-12 shadow-sm border border-sky-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                Admissions Open 2026-2027
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Join the Pathfinder Global School Family
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Admissions are currently underway for Pre-Primary through Grade 11. Schedule a campus tour, explore our laboratories, and meet our academic counseling faculty.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>+91 1274 248900 / +91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>admissions@pathfinderglobal.edu.in</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/15 space-y-3">
              <h4 className="font-bold text-sm text-white">Have a Query for the Academic Dean?</h4>
              <p className="text-xs text-slate-300">
                Parents and guardians can request an appointment with Mrs. Neeta Chahal or the admissions directorate.
              </p>
              <button
                onClick={() => onEnterDashboard(students[0])}
                className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Access Portal & Book Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-700">Pathfinder Global School</span>
          <span> · Affiliated to CBSE New Delhi (Affiliation No: 531289)</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onEnterDashboard(students[0])}
            className="hover:text-slate-900 cursor-pointer"
          >
            Student Portal
          </button>
          <span>·</span>
          <span>Exam Cell</span>
          <span>·</span>
          <span>Transport Directorate</span>
        </div>
      </footer>
    </div>
  );
};
