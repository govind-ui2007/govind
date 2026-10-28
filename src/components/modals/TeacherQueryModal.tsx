import React, { useState } from 'react';
import { TeacherContact, Student } from '../../types';
import { X, Send, CheckCircle2, Mail } from 'lucide-react';

interface TeacherQueryModalProps {
  teacher: TeacherContact | null;
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onSendQuery: (teacherId: string, subject: string, message: string) => void;
}

export const TeacherQueryModal: React.FC<TeacherQueryModalProps> = ({
  teacher,
  student,
  isOpen,
  onClose,
  onSendQuery,
}) => {
  const [subjectTitle, setSubjectTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !teacher) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectTitle.trim() || !message.trim()) {
      setErrorMsg('Please enter both subject query topic and details.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSendQuery(teacher.id, subjectTitle, message);
        setIsSuccess(false);
        setSubjectTitle('');
        setMessage('');
        setErrorMsg('');
        onClose();
      }, 700);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider block">
              Direct Academic Connect
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Message {teacher.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center justify-between font-medium">
              <span>Department: <strong className="text-slate-800">{teacher.subject}</strong></span>
              <span className="flex items-center gap-1 text-slate-500">
                <Mail className="w-3.5 h-3.5" />
                <span>{teacher.email}</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Consultation Hours: {teacher.officeHours}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Query Subject / Topic
            </label>
            <input
              type="text"
              value={subjectTitle}
              onChange={(e) => {
                setSubjectTitle(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="e.g. Clarification on Electrostatics homework problem 8"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Query Details
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder={`Respected ${teacher.name.split(' ')[0]}, I am writing regarding ${student.name}'s understanding of...`}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
              required
            />
            {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || isSuccess}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Message Sent!</span>
                </>
              ) : isSending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Query</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
