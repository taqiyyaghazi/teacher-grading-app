'use client';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate, translateAssignmentSubject } from '@/lib/utils';
import { useAssignmentStore } from '@/stores/assignment-store';
import GradeForm from './grade-form';

const AssignmentDialogContent = () => {
  const { selectedAssignment } = useAssignmentStore();

  if (!selectedAssignment) {
    return null;
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Assess Assignment</DialogTitle>
      </DialogHeader>
      <table>
        <tbody className="[&_td]:px-4 [&_td]:py-2 [&_td]:border-b">
          <tr>
            <td className="font-semibold">Subject</td>
            <td>{translateAssignmentSubject(selectedAssignment.subject)}</td>
          </tr>
          <tr>
            <td className="font-semibold">Title</td>
            <td>{selectedAssignment.title}</td>
          </tr>
          <tr>
            <td className="font-semibold">Student</td>
            <td>{selectedAssignment.student.name}</td>
          </tr>
          <tr>
            <td className="font-semibold">Submitted At</td>
            <td>{formatDate(selectedAssignment.createdAt)}</td>
          </tr>
          {selectedAssignment.grade && (
            <>
              <tr>
                <td className="font-semibold">Grade</td>
                <td>{selectedAssignment.grade.grade}</td>
              </tr>
              <tr>
                <td className="font-semibold">Assessed At</td>
                <td>{formatDate(selectedAssignment.grade.createdAt)}</td>
              </tr>
              <tr>
                <td className="font-semibold">Assessed By</td>
                <td>{selectedAssignment.grade.teacher.name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Feedback</td>
                <td>{selectedAssignment.grade.feedback}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {!selectedAssignment.grade && <GradeForm />}
    </DialogContent>
  );
};

export default AssignmentDialogContent;
