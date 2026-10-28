import React, { useState } from 'react';
import { Student } from '../../types';
import { X, Check, ShieldCheck, User } from 'lucide-react';

interface StudentSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  currentStudent: Student;
  onSelectStudent: (student: Student) => void;
}

export const StudentSwitcherModal: React.FC<StudentSwitcherModalProps> = ({
  isOpen,
  onClose,
  students,
  currentStudent,
  onSelectStudent,
}) => {
  const [customAdmissionNo, setCustomAdmissionNo] = useState('');
  const [customError, setCustomError] = useState('');

  if (!isOpen) return null;

  const handleCustomLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = customAdmissionNo.trim().toUpperCase();
    if (!query) {
      setCustomError('Please enter an Admission No or Student Name');
      return;
    }
    const found = students.find(
      (s) =>
        s.admissionNo.toUpperCase().includes(query) ||
        s.name.toUpperCase().includes(query)
    );
    if (found) {
      onSelectStudent(found);
      setCustomAdmissionNo('');
      setCustomError('');
      onClose();
    } else {
      setCustomError(`No student record found matching "${query}". Try "Govind" or "Ananya".`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">Student Account Switcher</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an enrolled student profile or verify credentials
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Demo Student Accounts
            </label>
            {students.map((student) => {
              const isSelected = student.id === currentStudent.id;
              return (
                <button
                  key={student.id}
                  onClick={() => {
                    onSelectStudent(student);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'border-sky-800 bg-sky-50/70'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-sky-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-900 truncate">
                        {student.name}
                      </span>
                      {isSelected && (
                        <span className="text-xs font-medium text-sky-800 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {student.grade} - Section {student.section} · {student.stream}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {student.admissionNo} · Roll #{student.rollNo} · House: {student.house}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200">
            <form onSubmit={handleCustomLookup} className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Quick Portal Lookup by Admission No / Name
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. PGS-2023-1042 or Govind"
                    value={customAdmissionNo}
                    onChange={(e) => {
                      setCustomAdmissionNo(e.target.value);
                      if (customError) setCustomError('');
                    }}
                    className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors shrink-0"
                >
                  Load
                </button>
              </div>
              {customError && (
                <p className="text-xs text-rose-600">{customError}</p>
              )}
            </form>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-sky-800 shrink-0" />
            <span>Authenticated CBSE Integrated School ERP Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};
