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
  studentId: string;
  createdAt: Date;
  updatedAt: Date;
}
