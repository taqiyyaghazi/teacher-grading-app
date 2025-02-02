'use client';
import CardSkeleton from '@/components/ui/card-skeleton';
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
    return (
      <section className="space-y-4 py-4 px-8 md:px-16">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={`assignment-skeleton-${index}`} />
        ))}
      </section>
    );
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
