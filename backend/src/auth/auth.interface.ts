export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginReturn {
  accessToken: string;
}
