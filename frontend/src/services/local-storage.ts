import { UserRole } from '@/types/enum';

type SetAuthDataPayload = {
  accessToken: string;
  role: UserRole;
  userId: string;
};

export const setAuthData = (payload: SetAuthDataPayload): void => {
  localStorage.setItem('accessToken', payload.accessToken);
  localStorage.setItem('role', payload.role);
  localStorage.setItem('userId', payload.userId);
};

export const removeAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};
