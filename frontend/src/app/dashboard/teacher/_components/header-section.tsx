'use client';

import HeaderDropdownFilter from './header-dropdown-filter';

const HeaderSection = () => {
  return (
    <header className="pt-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Student Assignment</h1>
      <HeaderDropdownFilter />
    </header>
  );
};

export default HeaderSection;
