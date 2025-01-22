'use client';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useAssignmentStore } from '@/stores/assignment-store';
import { useAuthStore } from '@/stores/auth-store';
import { LogOut, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AssignmentDialogContent from './assignment-dialog-content';

const HeaderSection = () => {
  const { logout } = useAuthStore();
  const { isOpenDialog, openDialog, closeDialog } = useAssignmentStore();
  const router = useRouter();

  return (
    <header className="pt-4 flex flex-wrap gap-2 justify-between items-center sticky top-0 bg-background px-8 md:px-16">
      <h1 className="font-bold text-xl w-full md:w-fit">Assignment Grades</h1>

      <div className="w-full md:w-fit space-x-2">
        <Button onClick={openDialog}>
          Submit Assignment <Plus />
        </Button>
        <Dialog
          open={isOpenDialog}
          onOpenChange={(isOpenDialog) =>
            isOpenDialog ? openDialog() : closeDialog()
          }
        >
          <AssignmentDialogContent />
        </Dialog>
        <Button onClick={() => logout({ router })}>
          Logout <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default HeaderSection;
