import { api } from '@/services/api';
import { getUserId } from '@/services/local-storage';
import { GetGradesResponse } from '@/types/api';
import { AssignmentGrade } from '@/types/assignment';
import { create } from 'zustand';

export type GradeState = {
  isLoading: boolean;
  grades: AssignmentGrade[];
};

export type GradeActions = {
  getGrades: () => Promise<void>;
};

export type GradeStore = GradeState & GradeActions;

const initState: GradeState = {
  isLoading: false,
  grades: [],
};

export const useGradeStore = create<GradeState & GradeActions>((set) => ({
  ...initState,
  getGrades: async () => {
    set({ isLoading: true });
    const userId = getUserId();

    const response = await api.get<GetGradesResponse>(`/grades/${userId}`);

    if (response.ok && response.data?.result) {
      set({ grades: response.data.result });
    }

    set({ isLoading: false });
  },
}));
