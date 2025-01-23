'use client';
import CardSkeleton from '@/components/ui/card-skeleton';
import { useGradeStore } from '@/stores/grade-store';
import { useEffect } from 'react';
import GradeCard from './grade-card';

const GradesSection = () => {
  const { getGrades, isLoading, grades } = useGradeStore();

  useEffect(() => {
    getGrades();
  }, [getGrades]);

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
      {grades.map((item) => (
        <GradeCard key={item.id} {...item} />
      ))}
    </section>
  );
};

export default GradesSection;
