import { AssignmentSubject } from '@/types/enum';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

export const translateAssignmentSubject = (subject: AssignmentSubject) => {
  switch (subject) {
    case AssignmentSubject.ENGLISH_WRITING:
      return 'English Writing';
    case AssignmentSubject.MATH_HOMEWORK:
      return 'Math Homework';
    default:
      return 'Unknown';
  }
};
