export enum AssignmentSubject {
  ENGLISH_WRITING = 'ENGLISH_WRITING',
  MATH_HOMEWORK = 'MATH_HOMEWORK',
}

export interface CreateAssignmentPayload {
  subject: AssignmentSubject;
  title: string;
  content: string;
  studentId: string;
}

export interface FindAllAssignmentsPayload {
  subject?: AssignmentSubject;
}

export interface FindAllAssignmentsReturn {
  id: string;
  subject: string;
  title: string;
  content: string;
  createdAt: Date;
  student: { name: string };
  grade: {
    createdAt: Date;
    feedback: string;
    grade: number;
    teacher: { name: string };
  } | null;
}
