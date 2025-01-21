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
