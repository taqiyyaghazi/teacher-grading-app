import { Assignment } from './assignment';
import { UserRole } from './enum';

type ApiResponse<T> = {
  message: string;
  result: T;
};

export type LoginResponse = ApiResponse<{
  accessToken: string;
  role: UserRole;
}>;

export type CreateAccountResponse = ApiResponse<undefined>;

export type GetAssignmentsResponse = ApiResponse<Assignment[]>;

export type AssessAsignmentResponse = ApiResponse<undefined>
