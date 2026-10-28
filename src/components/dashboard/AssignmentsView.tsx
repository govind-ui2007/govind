import React, { useState } from 'react';
import { Assignment } from '../../types';
import {
  FileText,
  Calendar,
  User,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  Search,
  MessageSquare,
} from 'lucide-react';

interface AssignmentsViewProps {
  assignments: Assignment[];
  onOpenSubmitModal: (assignment: Assignment) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  onOpenSubmitModal,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const subjects = ['All', ...Array.from(new Set(assignments.map((a) => a.subject)))];

  const filteredAssignments = assignments.filter((a) => {
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchesSubject = selectedSubject === 'All' || a.subject === selectedSubject;
    const matchesQuery =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSubject && matchesQuery;
  });

  const pendingCount = assignments.filter((a) => a.status === 'pending').length;
  const gradedCount = assignments.filter((a) => a.status === 'graded').length;
  const submittedCount = assignments.filter((a) => a.status === 'submitted').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Homework & Coursework</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit digital assignments, download faculty rubrics, and track evaluation scores
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments or teacher..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-800"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Status Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({assignments.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterStatus === 'pending'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilterStatus('submitted')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterStatus === 'submitted'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Under Review ({submittedCount})
            </button>
            <button
              onClick={() => setFilterStatus('graded')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterStatus === 'graded'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Evaluated ({gradedCount})
            </button>
          </div>

          {/* Subject Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="py-1.5 px-2.5 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-800"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Assignment Cards List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-800 text-sm">No assignments found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your filter criteria or search query.
            </p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">
                    {assignment.subject}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{assignment.teacher}</span>
                  </span>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  {assignment.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      <Clock className="w-3 h-3" />
                      <span>Pending Due {assignment.dueDate}</span>
                    </span>
                  )}
                  {assignment.status === 'submitted' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Submitted on {assignment.submittedOn}</span>
                    </span>
                  )}
                  {assignment.status === 'graded' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      <span>
                        Graded: {assignment.obtainedMarks} / {assignment.maxMarks}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{assignment.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {assignment.description}
                </p>
              </div>

              {/* Teacher Feedback / Submissions */}
              {assignment.teacherFeedback && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-900" />
                    <span>Faculty Evaluation & Feedback:</span>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">
                    "{assignment.teacherFeedback}"
                  </p>
                </div>
              )}

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center flex-wrap gap-3 text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Assigned: {assignment.assignedDate}</span>
                  </span>
                  <span>·</span>
                  <span>Max Marks: <strong className="text-slate-800">{assignment.maxMarks}</strong></span>
                  {assignment.submittedFileName && (
                    <>
                      <span>·</span>
                      <span className="text-sky-800 font-mono text-[11px] truncate max-w-[200px]">
                        File: {assignment.submittedFileName}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {assignment.attachmentName && (
                    <button
                      onClick={() => alert(`Downloading ${assignment.attachmentName}`)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Rubric / Paper</span>
                    </button>
                  )}

                  {assignment.status === 'pending' ? (
                    <button
                      onClick={() => onOpenSubmitModal(assignment)}
                      className="px-3.5 py-1.5 bg-sky-900 hover:bg-sky-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Submit Solution</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenSubmitModal(assignment)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>Re-upload</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
