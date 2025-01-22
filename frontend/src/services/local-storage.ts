type SetAuthDataPayload = {
  accessToken: string;
  role: string;
};

export const setAuthData = (payload: SetAuthDataPayload): void => {
  localStorage.setItem('accessToken', payload.accessToken);
  localStorage.setItem('role', payload.role);
};
