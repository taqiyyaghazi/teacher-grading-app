import React from 'react';
import AssignmentSection from './_components/assignments-section';
import HeaderSection from './_components/header-section';

export default async function DashboardTeacher() {
  return (
    <main>
      <HeaderSection />
      <AssignmentSection />
    </main>
  );
}
