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
