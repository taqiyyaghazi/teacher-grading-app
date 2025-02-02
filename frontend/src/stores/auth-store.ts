import { api } from '@/services/api';
import { removeAuthData, setAuthData } from '@/services/local-storage';
import { LoginResponse } from '@/types/api';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Swal from 'sweetalert2';
import { create } from 'zustand';

export type AuthState = {
  isLoading: boolean;
};

type LoginPayload = {
  data: { email: string; password: string };
  router: AppRouterInstance;
};

type LogoutPayload = {
  router: AppRouterInstance;
};

export type AuthActions = {
  login: (payload: LoginPayload) => void;
  logout: (payload: LogoutPayload) => void;
};

export type AuthStore = AuthState & AuthActions;

const initState: AuthState = {
  isLoading: false,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initState,
  login: async ({ data, router }) => {
    set({ isLoading: true });
    const response = await api.post<LoginResponse>('/auth/login', data);

    if (response.ok && response.data?.result) {
      const { result, message } = response.data;
      setAuthData(result);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
      }).then(() => {
        router.push(`/dashboard/${result.role.toLowerCase()}`);
      });
    }

    set({ isLoading: false });
  },
  logout: ({ router }) => {
    removeAuthData();
    router.push('/');
  },
}));
