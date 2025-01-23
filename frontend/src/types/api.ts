import { Assignment, AssignmentGrade } from './assignment';
import { UserRole } from './enum';
import { Notification } from './notification';

type ApiResponse<T> = {
  message: string;
  result: T;
};

export type LoginResponse = ApiResponse<{
  accessToken: string;
  role: UserRole;
  userId: string;
}>;

export type CreateAccountResponse = ApiResponse<undefined>;

export type GetAssignmentsResponse = ApiResponse<Assignment[]>;

export type AssessAsignmentResponse = ApiResponse<undefined>;

export type GetGradesResponse = ApiResponse<AssignmentGrade[]>;

export type SubmitAssignmentResponse = ApiResponse<undefined>;

export type GetNotificationsResponse = ApiResponse<Notification[]>;
