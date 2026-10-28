export interface Student {
  id: string;
  name: string;
  admissionNo: string;
  rollNo: number;
  grade: string;
  section: string;
  house: 'Phoenix' | 'Pegasus' | 'Orion' | 'Hercules';
  stream: string;
  photoUrl?: string;
  dob: string;
  bloodGroup: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  attendanceRate: number;
  currentGpa: number;
  academicYear: string;
}

export interface TimetablePeriod {
  periodNumber: number;
  timeRange: string;
  subject: string;
  teacher: string;
  room: string;
  isBreak?: boolean;
}

export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface AttendanceDay {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  status: 'present' | 'absent' | 'late' | 'excused' | 'holiday' | 'weekend';
  remarks?: string;
}

export interface SubjectAttendance {
  subject: string;
  totalClasses: number;
  attended: number;
  percentage: number;
  status: 'Safe' | 'Warning' | 'Critical';
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  description: string;
  attachmentName?: string;
  maxMarks: number;
  obtainedMarks?: number;
  submittedOn?: string;
  submittedFileName?: string;
  teacherFeedback?: string;
}

export interface ExamSubjectMark {
  subject: string;
  code: string;
  maxTheory: number;
  obtainedTheory: number;
  maxPractical: number;
  obtainedPractical: number;
  totalMax: number;
  totalObtained: number;
  grade: string;
  gradePoint: number;
}

export interface ExamReportCard {
  examName: string;
  term: string;
  issueDate: string;
  overallPercentage: number;
  cgpa: number;
  classRank: number;
  totalStudents: number;
  attendancePercentage: number;
  teacherRemarks: string;
  principalRemarks: string;
  subjects: ExamSubjectMark[];
}

export interface FeeItem {
  id: string;
  invoiceNo: string;
  term: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  breakdown: { label: string; amount: number }[];
  paidDate?: string;
  paymentMethod?: string;
  receiptNo?: string;
}

export interface SchoolNotice {
  id: string;
  title: string;
  category: 'academic' | 'examination' | 'sports' | 'events' | 'administrative';
  date: string;
  priority: 'urgent' | 'normal';
  excerpt: string;
  content: string;
  issuedBy: string;
  attachmentTitle?: string;
}

export interface BusRouteInfo {
  routeNumber: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  helperName: string;
  pickupPoint: string;
  morningPickupTime: string;
  afternoonDropTime: string;
  currentStatus: 'On Schedule' | 'Approaching Stop' | 'Slight Delay';
  nextStopName: string;
  etaMinutes: number;
}

export interface TeacherContact {
  id: string;
  name: string;
  subject: string;
  designation: string;
  email: string;
  officeHours: string;
}

export interface LeaveApplication {
  id: string;
  studentId: string;
  reason: string;
  startDate: string;
  endDate: string;
  appliedDate: string;
  status: 'approved' | 'pending' | 'rejected';
  leaveType: 'Medical' | 'Personal' | 'Academic Event';
}

export interface StaffUser {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  subject: string;
  assignedClass: string;
  email: string;
  phone: string;
}

export interface ClassStudentAttendance {
  studentId: string;
  studentName: string;
  rollNo: number;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface AuthSession {
  role: 'student' | 'staff';
  student?: Student;
  staff?: StaffUser;
}
