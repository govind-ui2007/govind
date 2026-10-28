import React, { useState } from 'react';
import { Student, ExamReportCard } from '../../types';
import { REPORT_CARD_DATA } from '../../data/mockData';
import { Award, Printer, TrendingUp, CheckCircle, FileText, ChevronRight } from 'lucide-react';

interface ExamsViewProps {
  student: Student;
  onOpenReportCardModal: () => void;
}

export const ExamsView: React.FC<ExamsViewProps> = ({
  student,
  onOpenReportCardModal,
}) => {
  const [selectedTerm, setSelectedTerm] = useState<string>('term1');
  const reportCard: ExamReportCard = REPORT_CARD_DATA;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Examinations & Digital Report Card</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified scholastic records and CBSE Continuous Assessment marks
            </p>
          </div>

          <button
            onClick={onOpenReportCardModal}
            className="px-4 py-2 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Official Printable PDF</span>
          </button>
        </div>

        {/* Term Tabs */}
        <div className="flex items-center gap-1.5 pt-4">
          <button
            onClick={() => setSelectedTerm('term1')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedTerm === 'term1'
                ? 'bg-sky-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mid-Term Assessment 2025-26 (Published)
          </button>
          <button
            onClick={() => setSelectedTerm('ut1')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedTerm === 'ut1'
                ? 'bg-sky-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Unit Test 1 (Archived)
          </button>
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Aggregate Percentage</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-sky-950 mt-1">
            {reportCard.overallPercentage}%
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Grade: A1 Distinction</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Cumulative GPA</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {reportCard.cgpa} / 10.0
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Based on 5 core subjects</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Class Standing</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-indigo-900 mt-1">
            Rank #{reportCard.classRank}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Out of {reportCard.totalStudents} enrolled students</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Attendance Factor</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {reportCard.attendancePercentage}%
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">100% Exam Eligibility</p>
        </div>
      </div>

      {/* Marks Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-sky-900" />
            <h3 className="text-sm font-bold text-slate-900">
              Subject Scorecard · {reportCard.examName}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Issued on {reportCard.issueDate}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Subject & Code</th>
                <th className="py-3 px-3 font-semibold text-center">Theory (80)</th>
                <th className="py-3 px-3 font-semibold text-center">Practical (20)</th>
                <th className="py-3 px-3 font-semibold text-center">Total (100)</th>
                <th className="py-3 px-3 font-semibold text-center">Grade</th>
                <th className="py-3 px-4 font-semibold text-right">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportCard.subjects.map((sub) => (
                <tr key={sub.code} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <span className="font-mono text-slate-400 mr-2 text-[11px]">{sub.code}</span>
                    {sub.subject}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono tabular-nums text-slate-700">
                    {sub.obtainedTheory}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono tabular-nums text-slate-700">
                    {sub.obtainedPractical}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-mono font-bold tabular-nums text-slate-900 text-sm">
                      {sub.totalObtained}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded">
                      {sub.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-800">
                    {sub.gradePoint.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Observations & Remarks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Class Mentor Observations</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "{reportCard.teacherRemarks}"
          </p>
          <div className="pt-2 text-[11px] text-slate-400">
            Sign-off: Mrs. Neeta Chahal (Senior PGT)
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-sky-800" />
            <span>Principal & Exam Controller Remarks</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "{reportCard.principalRemarks}"
          </p>
          <div className="pt-2 text-[11px] text-slate-400">
            Pathfinder Global School Academic Council
          </div>
        </div>
      </div>
    </div>
  );
};
