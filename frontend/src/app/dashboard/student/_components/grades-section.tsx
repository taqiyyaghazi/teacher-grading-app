'use client';
import { useGradeStore } from '@/stores/grade-store';
import { useEffect } from 'react';
import GradeCard from './grade-card';

const GradesSection = () => {
  const { getGrades, isLoading, grades } = useGradeStore();

  useEffect(() => {
    getGrades();
  }, [getGrades]);

  if (isLoading) {
    return <section>Loading...</section>;
  }

  return (
    <section className="space-y-4 py-4 px-8 md:px-16">
      {grades.map((item) => (
        <GradeCard key={item.id} {...item}/>
      ))}
    </section>
  );
};

export default GradesSection;
