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

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffSeconds < 60) {
    return rtf.format(-diffSeconds, 'seconds');
  }
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return rtf.format(-diffMinutes, 'minutes');
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return rtf.format(-diffHours, 'hours');
  }
  const diffDays = Math.floor(diffHours / 24);
  return rtf.format(-diffDays, 'days');
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
