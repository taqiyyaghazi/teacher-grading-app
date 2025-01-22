import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';
import AssignmentForm from './assignment-form';

const AssignmentDialogContent = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Submit Your Assignment</DialogTitle>
      </DialogHeader>
      <AssignmentForm />
    </DialogContent>
  );
};

export default AssignmentDialogContent;
