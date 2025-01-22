import React from 'react';
import HeaderSection from './_components/header-section';
import GradesSection from './_components/grades-section';

export default async function DashboardStudent() {
  return (
    <main>
      <HeaderSection />
      <GradesSection />
    </main>
  );
}
