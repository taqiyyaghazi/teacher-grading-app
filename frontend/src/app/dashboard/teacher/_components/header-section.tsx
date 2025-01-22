'use client';
import { Button } from '@/components/ui/button';
import HeaderDropdownFilter from './header-dropdown-filter';
import { useAuthStore } from '@/stores/auth-store';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeaderSection = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  return (
    <header className="pt-4 flex flex-wrap gap-2 justify-between items-center px-8 md:px-16">
      <h1 className="font-bold text-xl w-full md:w-fit">Student Assignments</h1>
      <div className="flex justify-between items-center w-full md:w-fit md:block space-x-2">
        <HeaderDropdownFilter />
        <Button onClick={() => logout({ router })}>
          Logout <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default HeaderSection;
