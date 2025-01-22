import { AssignmentSubject } from './enum';
import { Grade } from './grade';

export type Assignment = {
  id: string;
  subject: AssignmentSubject;
  title: string;
  content: string;
  student: {
    name: string;
  };
  grade: Grade | null;
  createdAt: Date;
  updatedAt: Date;
};
