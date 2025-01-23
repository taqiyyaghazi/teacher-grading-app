import { api } from '@/services/api';
import { GetNotificationsResponse } from '@/types/api';
import { Notification } from '@/types/notification';
import { create } from 'zustand';

export type NotificationState = {
  isLoading: boolean;
  notifications: Notification[];
};

export type NotificationActions = {
  getNotifications: () => Promise<void>;
};

export type NotificationStore = NotificationState & NotificationActions;

const initState: NotificationState = {
  isLoading: false,
  notifications: [],
};

export const useNotificationStore = create<NotificationState & NotificationActions>((set) => ({
  ...initState,
  getNotifications: async () => {
    set({ isLoading: true });

    const response = await api.get<GetNotificationsResponse>('/notifications');

    if (response.ok && response.data?.result) {
      set({ notifications: response.data.result });
    }

    set({ isLoading: false });
  },
}));
