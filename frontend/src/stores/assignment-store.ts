import { Toast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import {
  AssessAsignmentResponse,
  GetAssignmentsResponse,
  SubmitAssignmentResponse,
} from '@/types/api';
import { Assignment } from '@/types/assignment';
import { AssignmentSubject } from '@/types/enum';
import { create } from 'zustand';
import { useGradeStore } from './grade-store';

export type AssignmentState = {
  isLoading: boolean;
  isLoadingAssessment: boolean;
  assignments: Assignment[];
  filterSubject: AssignmentSubject | null;
  selectedAssignment: null | Assignment;
  isOpenDialog: boolean;
};

type AssessAsignmentPayload = {
  grade: number;
  feedback: string;
  assignmentId: string;
};

type SubmitAssignmentPayload = {
  subject: AssignmentSubject;
  title: string;
  content: string;
};

export type AssignmentActions = {
  openDialog: () => void;
  closeDialog: () => void;
  getAssignments: () => Promise<void>;
  setFilterSubject: (subject: AssignmentSubject | 'ALL') => void;
  selectAssignment: (id: string) => void;
  assessAssignment: (
    payload: AssessAsignmentPayload,
    toast: (props: Toast) => void
  ) => Promise<void>;
  submitAssignment: (
    payload: SubmitAssignmentPayload,
    toast: (props: Toast) => void
  ) => Promise<void>;
};

export type AssignmentStore = AssignmentState & AssignmentActions;

const initState: AssignmentState = {
  isLoading: false,
  isLoadingAssessment: false,
  assignments: [],
  filterSubject: null,
  selectedAssignment: null,
  isOpenDialog: false,
};

export const useAssignmentStore = create<AssignmentState & AssignmentActions>(
  (set, get) => ({
    ...initState,
    openDialog: () => set({ isOpenDialog: true }),
    closeDialog: () => set({ isOpenDialog: false }),
    getAssignments: async () => {
      set({ isLoading: true });
      const querySubject = get().filterSubject;
      const response = await api.get<GetAssignmentsResponse>(
        `/assignments${querySubject ? `?subject=${querySubject}` : ''}`
      );

      if (response.ok && response.data?.result) {
        set({ assignments: response.data.result });
      }

      set({ isLoading: false });
    },
    setFilterSubject: (subject) => {
      if (subject === 'ALL') {
        set({ filterSubject: null });
      } else {
        set({ filterSubject: subject });
      }
    },
    selectAssignment: (id) => {
      const assignment =
        get().assignments.find((assignment) => assignment.id === id) || null;
      set({ selectedAssignment: assignment });
    },
    assessAssignment: async (payload, toast) => {
      set({ isLoadingAssessment: true });

      const response = await api.post<AssessAsignmentResponse>(
        '/grades',
        payload
      );

      if (response.ok && response.data?.message) {
        toast({
          title: 'Success!',
          description: response.data.message,
        });
        get().getAssignments();
        get().selectAssignment(payload.assignmentId);
      }

      set({ isLoadingAssessment: false, isOpenDialog: false });
    },
    submitAssignment: async (payload, toast) => {
      set({ isLoading: true });

      const getGrades = useGradeStore.getState().getGrades;

      const response = await api.post<SubmitAssignmentResponse>(
        '/assignments',
        payload
      );

      if (response.ok && response.data?.message) {
        getGrades();
        toast({
          title: 'Success!',
          description: response.data.message,
        });
      }
      set({ isLoading: false, isOpenDialog: false });
    },
  })
);
