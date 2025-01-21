export interface CreateGradePayload {
  grade: number;
  feedback: string;
  assignmentId: string;
  teacherId: string;
}

export interface FindAllGradesByStudentIdPayload {
  studentId: string;
  userId: string;
}

export interface Grade {
  id: string;
  grade: number;
  feedback: string;
  assignmentId: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindAllGradesByStudentIdReturn {
  id: string;
  subject: string;
  title: string;
  content: string;
  studentId: string;
  createdAt: Date;
  updatedAt: Date;
  grades: Grade[];
}
