import React, { useState } from 'react';
import { Assignment } from '../../types';
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react';

interface SubmitAssignmentModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (assignmentId: string, fileName: string, notes: string) => void;
}

export const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  assignment,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedFileName, setSelectedFileName] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !assignment) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleSimulateDefaultFile = () => {
    setSelectedFileName(`${assignment.subject.replace(/\s+/g, '_')}_Solution_Draft.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFile = selectedFileName || `${assignment.subject.replace(/\s+/g, '_')}_Assignment_Submission.pdf`;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSubmit(assignment.id, finalFile, submissionNotes);
        setIsSuccess(false);
        setSelectedFileName('');
        setSubmissionNotes('');
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
              {assignment.subject}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5 line-clamp-1">
              {assignment.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span>Teacher: <strong className="text-slate-800">{assignment.teacher}</strong></span>
              <span>Due: <strong className="text-slate-800">{assignment.dueDate}</strong></span>
            </div>
            <div>Max Marks: <strong className="text-slate-800">{assignment.maxMarks}</strong></div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Attach Completed Document / PDF
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-5 text-center hover:border-sky-800 transition-colors bg-white">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-600 mb-1">
                Drag and drop your file here, or{' '}
                <label className="text-sky-800 font-semibold cursor-pointer underline hover:text-sky-900">
                  browse files
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </label>
              </p>
              <p className="text-[11px] text-slate-400">PDF, DOCX, JPG up to 25MB</p>

              {selectedFileName ? (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 text-sky-900 border border-sky-200 rounded-md text-xs font-medium">
                  <FileText className="w-4 h-4 text-sky-700" />
                  <span className="truncate max-w-[220px]">{selectedFileName}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSimulateDefaultFile}
                  className="mt-3 text-xs text-slate-600 underline hover:text-slate-900"
                >
                  Or click to attach sample solution document
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Student Note / Remarks (Optional)
            </label>
            <textarea
              rows={3}
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              placeholder="Add any clarification or notes for your teacher..."
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
            />
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
              disabled={isSubmitting || isSuccess}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Submitted Successfully!</span>
                </>
              ) : isSubmitting ? (
                <span>Submitting Work...</span>
              ) : (
                <span>Submit Assignment</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
