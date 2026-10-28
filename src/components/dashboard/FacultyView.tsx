import React from 'react';
import { TeacherContact, Student } from '../../types';
import { TEACHERS_DATA } from '../../data/mockData';
import { Mail, Clock, MessageSquare, GraduationCap } from 'lucide-react';

interface FacultyViewProps {
  student: Student;
  onOpenTeacherQuery: (teacher: TeacherContact) => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({
  student,
  onOpenTeacherQuery,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Academic Faculty & Mentors</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Grade 10-A Subject Educators · Direct parental inquiry & academic guidance
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Class Mentor: Mrs. Neeta Chahal
          </span>
        </div>

        <p className="text-xs text-slate-600 pt-3 leading-relaxed">
          Faculty members hold daily student doubt-clearing sessions and parental consultations. Messages sent via this portal are dispatched directly to the official staff ERP inbox.
        </p>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEACHERS_DATA.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-sky-900 uppercase tracking-wider block">
                    {teacher.subject}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{teacher.designation}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-900 flex items-center justify-center font-bold text-xs shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Hours: {teacher.officeHours}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenTeacherQuery(teacher)}
              className="w-full py-2 px-3 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send Query / Request Meet</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
