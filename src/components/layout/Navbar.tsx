import React from 'react';
import { Student, StaffUser } from '../../types';
import { LogOut, ArrowRight, LogIn, Briefcase, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentView: 'public' | 'login' | 'dashboard' | 'staff';
  onNavigateView: (view: 'public' | 'login' | 'dashboard' | 'staff') => void;
  activeStudent?: Student;
  activeStaff?: StaffUser;
  onOpenStudentSwitcher?: () => void;
  onSelectPublicSection?: (sectionId: string) => void;
  onLogOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateView,
  activeStudent,
  activeStaff,
  onOpenStudentSwitcher,
  onSelectPublicSection,
  onLogOut,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigateView('public')}
          className="text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-900 text-white flex items-center justify-center font-bold text-base shadow-sm">
              P
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-sky-900 transition-colors whitespace-nowrap">
              Pathfinder Global School
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {currentView === 'public' && (
            <>
              <button
                onClick={() => onSelectPublicSection?.('academics')}
                className="hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
              >
                Academics
              </button>
              <button
                onClick={() => onSelectPublicSection?.('facilities')}
                className="hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
              >
                Campus Facilities
              </button>
              <button
                onClick={() => onSelectPublicSection?.('circulars')}
                className="hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
              >
                Circulars & Notices
              </button>
              <button
                onClick={() => onSelectPublicSection?.('admissions')}
                className="hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
              >
                Admissions
              </button>
              <button
                onClick={() => onSelectPublicSection?.('contact')}
                className="hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
              >
                Contact Desk
              </button>
            </>
          )}

          {currentView === 'login' && (
            <>
              <button
                onClick={() => onNavigateView('public')}
                className="hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                School Portal Home
              </button>
              <span className="text-xs text-slate-400 select-none">·</span>
              <span className="text-xs text-sky-900 font-semibold whitespace-nowrap">
                ERP Authentication Center
              </span>
            </>
          )}

          {currentView === 'dashboard' && activeStudent && (
            <>
              <button
                onClick={() => onNavigateView('public')}
                className="hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                School Site
              </button>
              <span className="text-xs text-slate-400 select-none">·</span>
              <span className="text-xs text-slate-700 font-semibold flex items-center gap-1.5 whitespace-nowrap">
                <GraduationCap className="w-4 h-4 text-sky-900" />
                <span>Student: {activeStudent.name}</span>
              </span>
              <span className="text-xs text-slate-400 select-none">·</span>
              <span className="text-xs text-slate-500 font-mono tabular-nums whitespace-nowrap">
                Roll #{activeStudent.rollNo} · {activeStudent.grade}-{activeStudent.section}
              </span>
              {onOpenStudentSwitcher && (
                <button
                  onClick={onOpenStudentSwitcher}
                  className="text-xs text-sky-800 hover:text-sky-950 font-medium underline transition-colors whitespace-nowrap cursor-pointer"
                >
                  Switch
                </button>
              )}
            </>
          )}

          {currentView === 'staff' && activeStaff && (
            <>
              <button
                onClick={() => onNavigateView('public')}
                className="hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                School Site
              </button>
              <span className="text-xs text-slate-400 select-none">·</span>
              <span className="text-xs text-slate-700 font-semibold flex items-center gap-1.5 whitespace-nowrap">
                <Briefcase className="w-4 h-4 text-amber-700" />
                <span>Faculty: {activeStaff.name}</span>
              </span>
              <span className="text-xs text-slate-400 select-none">·</span>
              <span className="text-xs text-amber-800 font-mono font-medium whitespace-nowrap">
                {activeStaff.assignedClass}
              </span>
            </>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'public' && (
            <button
              onClick={() => onNavigateView('login')}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Portal Sign In</span>
            </button>
          )}

          {currentView === 'login' && (
            <button
              onClick={() => onNavigateView('public')}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              School Home
            </button>
          )}

          {(currentView === 'dashboard' || currentView === 'staff') && (
            <button
              onClick={onLogOut || (() => onNavigateView('login'))}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              title="Sign Out to Login Page"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
