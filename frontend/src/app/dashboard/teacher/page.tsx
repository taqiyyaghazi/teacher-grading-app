import React from 'react';
import AssignmentSection from './_components/assignments-section';
import HeaderSection from './_components/header-section';

export default async function DashboardTeacher() {
  return (
    <main className="px-16">
      <HeaderSection />
      <AssignmentSection />
    </main>
  );
}
