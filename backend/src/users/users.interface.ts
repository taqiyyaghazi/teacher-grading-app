export enum UserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export interface CreateUserPayload {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}
