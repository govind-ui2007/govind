import React from 'react';
import { Student, ExamReportCard } from '../../types';
import { X, Printer, Award, FileCheck, User } from 'lucide-react';

interface ReportCardPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  reportCard: ExamReportCard;
}

export const ReportCardPrintModal: React.FC<ReportCardPrintModalProps> = ({
  isOpen,
  onClose,
  student,
  reportCard,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full my-8 overflow-hidden print:m-0 print:border-none print:shadow-none">
        {/* Modal Controls (Hidden in print) */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50 no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-900" />
            <h3 className="text-sm font-bold text-slate-900">
              Official Academic Progress Report Card
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-sky-900 text-white rounded-lg text-xs font-semibold hover:bg-sky-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Report Card Document Body */}
        <div className="p-8 sm:p-10 bg-white text-slate-900" id="official-report-card">
          {/* Institution Header */}
          <div className="text-center pb-6 border-b-2 border-sky-950">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-sky-950 text-white font-bold text-2xl mb-2">
              P
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-sky-950 uppercase">
              Pathfinder Global School
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              Affiliated to CBSE, New Delhi · Affiliation No. 531289 · School Code 41265
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Sector 3 Campus, Pataudi-Rewari Highway · inquiry@pathfinderglobal.edu.in
            </p>
            <div className="mt-4 inline-block px-4 py-1 bg-slate-100 rounded text-xs font-bold uppercase tracking-wider text-slate-800 border border-slate-300">
              {reportCard.examName} · Academic Session {student.academicYear}
            </div>
          </div>

          {/* Student Profile Block */}
          <div className="my-6 grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div className="sm:col-span-1 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-200 pb-3 sm:pb-0 pr-0 sm:pr-4">
              <div className="w-16 h-16 rounded-xl bg-sky-950 text-white font-bold flex items-center justify-center border border-slate-300 shadow-xs">
                <User className="w-8 h-8 text-sky-200" />
              </div>
              <span className="font-mono text-[11px] text-slate-500 mt-1.5">
                {student.admissionNo}
              </span>
            </div>
            <div className="sm:col-span-3 grid grid-cols-2 gap-y-2 text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                <span className="font-bold text-sm text-slate-900">{student.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Class & Section</span>
                <span className="font-semibold text-slate-900">{student.grade} - Section {student.section}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Roll Number</span>
                <span className="font-mono font-semibold text-slate-900">{student.rollNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">House & Stream</span>
                <span className="font-semibold text-slate-900">{student.house} House · {student.stream}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Guardian / Father</span>
                <span className="text-slate-800">{student.guardianName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Date of Birth</span>
                <span className="font-mono text-slate-800">{student.dob}</span>
              </div>
            </div>
          </div>

          {/* Scholastic Achievement Table */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-sky-900" />
              <span>Part 1: Scholastic Assessment Performance</span>
            </h4>
            <div className="border border-slate-300 rounded overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                    <th className="py-2.5 px-3 text-left font-bold">Subject Code & Name</th>
                    <th className="py-2.5 px-2 text-center font-bold">Theory (80)</th>
                    <th className="py-2.5 px-2 text-center font-bold">Practical (20)</th>
                    <th className="py-2.5 px-2 text-center font-bold">Total (100)</th>
                    <th className="py-2.5 px-2 text-center font-bold">Grade</th>
                    <th className="py-2.5 px-3 text-right font-bold">Grade Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {reportCard.subjects.map((sub) => (
                    <tr key={sub.code} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        <span className="font-mono text-slate-400 mr-2 text-[11px]">{sub.code}</span>
                        {sub.subject}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono tabular-nums text-slate-700">
                        {sub.obtainedTheory}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono tabular-nums text-slate-700">
                        {sub.obtainedPractical}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono font-bold tabular-nums text-slate-900">
                        {sub.totalObtained}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-sky-900">
                        {sub.grade}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-800">
                        {sub.gradePoint.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Aggregate Performance Strip */}
          <div className="grid grid-cols-4 gap-3 p-3 bg-sky-900 text-white rounded mb-6 text-center text-xs">
            <div>
              <div className="text-[10px] text-sky-200 uppercase font-semibold">Aggregate Score</div>
              <div className="text-base font-bold font-mono tabular-nums mt-0.5">
                {reportCard.overallPercentage}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-sky-200 uppercase font-semibold">Cumulative GPA</div>
              <div className="text-base font-bold font-mono tabular-nums mt-0.5">
                {reportCard.cgpa} / 10.0
              </div>
            </div>
            <div>
              <div className="text-[10px] text-sky-200 uppercase font-semibold">Class Standing</div>
              <div className="text-base font-bold font-mono tabular-nums mt-0.5">
                Rank #{reportCard.classRank} of {reportCard.totalStudents}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-sky-200 uppercase font-semibold">Term Attendance</div>
              <div className="text-base font-bold font-mono tabular-nums mt-0.5">
                {reportCard.attendancePercentage}%
              </div>
            </div>
          </div>

          {/* Remarks Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="font-bold text-slate-800 block text-[11px] mb-1">
                Class Mentor / Teacher's Observations:
              </span>
              <p className="text-slate-600 italic leading-relaxed">
                "{reportCard.teacherRemarks}"
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="font-bold text-slate-800 block text-[11px] mb-1">
                Principal & Head of School Endorsement:
              </span>
              <p className="text-slate-600 italic leading-relaxed">
                "{reportCard.principalRemarks}"
              </p>
            </div>
          </div>

          {/* Signature Lines */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-3 text-center text-xs text-slate-600">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mx-8"></div>
              <p className="mt-2 font-medium">Class Teacher</p>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mx-8 flex items-center justify-center">
                <span className="font-serif text-[11px] text-slate-400 tracking-wider">OFFICIAL SEAL</span>
              </div>
              <p className="mt-2 font-medium">Exam Controller</p>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mx-8"></div>
              <p className="mt-2 font-medium">Principal</p>
            </div>
          </div>

          <div className="mt-6 text-[10px] text-slate-400 text-center font-mono">
            Generated via Pathfinder Global School Enterprise Academic ERP · Verification Ref: PGS-CERT-{student.id}-{Date.now().toString().slice(-6)}
          </div>
        </div>
      </div>
    </div>
  );
};
