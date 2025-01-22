'use client';
import { useAssignmentStore } from '@/stores/assignment-store';
import { useEffect } from 'react';
import AssignmentCard from './assignment-card';

const AssignmentSection = () => {
  const { getAssignments, assignments, filterSubject, isLoading } =
    useAssignmentStore();
  useEffect(() => {
    getAssignments();
  }, [filterSubject, getAssignments]);

  if (isLoading) {
    return <section>Loading...</section>;
  }

  return (
    <section className="space-y-4 py-4 px-8 md:px-16">
      {assignments.map((item) => (
        <AssignmentCard key={item.id} {...item} />
      ))}
    </section>
  );
};

export default AssignmentSection;
