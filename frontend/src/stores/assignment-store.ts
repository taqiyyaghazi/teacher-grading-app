import { api } from '@/services/api';
import { AssessAsignmentResponse, GetAssignmentsResponse } from '@/types/api';
import { Assignment } from '@/types/assignment';
import { AssignmentSubject } from '@/types/enum';
import Swal from 'sweetalert2';
import { create } from 'zustand';

export type AssignmentState = {
  isLoading: boolean;
  isLoadingAssessment: boolean;
  assignments: Assignment[];
  filterSubject: AssignmentSubject | null;
  selectedAssignment: null | Assignment;
};

type AssessAsignmentPayload = {
  grade: number;
  feedback: string;
  assignmentId: string;
};

export type AssignmentActions = {
  getAssignments: () => Promise<void>;
  setFilterSubject: (subject: AssignmentSubject | 'ALL') => void;
  selectAssignment: (id: string) => void;
  assessAssignment: (payload: AssessAsignmentPayload) => Promise<void>;
};

export type AssignmentStore = AssignmentState & AssignmentActions;

const initState: AssignmentState = {
  isLoading: false,
  isLoadingAssessment: false,
  assignments: [],
  filterSubject: null,
  selectedAssignment: null,
};

export const useAssignmentStore = create<AssignmentState & AssignmentActions>(
  (set, get) => ({
    ...initState,
    getAssignments: async () => {
      set({ isLoading: true });
      const querySubject = get().filterSubject;
      const response = await api.get<GetAssignmentsResponse>(
        `/assignments${querySubject ? `?subject=${querySubject}` : ''}`
      );
      console.log(response);

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
    assessAssignment: async (payload: AssessAsignmentPayload) => {
      set({ isLoadingAssessment: true });

      const response = await api.post<AssessAsignmentResponse>(
        '/grades',
        payload
      );

      if (response.ok && response.data?.message) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
        });
      }

      get().getAssignments();
      get().selectAssignment(payload.assignmentId);

      set({ isLoadingAssessment: false });
    },
  })
);
