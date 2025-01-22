import { api } from '@/services/api';
import { CreateAccountResponse } from '@/types/api';
import { UserRole } from '@/types/enum';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Swal from 'sweetalert2';
import { create } from 'zustand';

export type UserState = {
  isLoading: boolean;
};

type CreateAccountPayload = {
  data: { name: string; email: string; password: string; role: UserRole };
  router: AppRouterInstance;
};

export type UserActions = {
  createAccount: (payload: CreateAccountPayload) => void;
};

export type UserStore = UserState & UserActions;

const initState: UserState = {
  isLoading: false,
};

export const useUserStore = create<UserState & UserActions>((set) => ({
  ...initState,
  createAccount: async ({ data, router }) => {
    set({ isLoading: true });

    const response = await api.post<CreateAccountResponse>('/users', data);

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data?.message,
      }).then(() => {
        router.push('/');
      });
    }

    set({ isLoading: false });
  },
}));
