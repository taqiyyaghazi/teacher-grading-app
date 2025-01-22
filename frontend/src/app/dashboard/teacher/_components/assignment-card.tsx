'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import { useAssignmentStore } from '@/stores/assignment-store';
import { Assignment } from '@/types/assignment';
import AssignmentDialogContent from './assignment-dialog-content';

const AssignmentCard = (props: Assignment) => {
  const { selectAssignment } = useAssignmentStore();
  const { isOpenDialog, openDialog, closeDialog } = useAssignmentStore();

  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle className="flex flex-wrap gap-2 justify-between items-center">
          <p>{props.title}</p>
          {props.grade ? (
            <Badge variant="default">Assessed</Badge>
          ) : (
            <Badge variant="secondary">Unassessed</Badge>
          )}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <CardDescription>Submitted By {props.student.name}</CardDescription>
          <Separator orientation="vertical" />
          <CardDescription>
            Submitted At {formatDate(props.createdAt)}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => {
            selectAssignment(props.id);
            openDialog();
          }}
        >
          Detail
        </Button>
        <Dialog
          open={isOpenDialog}
          onOpenChange={(isOpenDialog) =>
            isOpenDialog ? openDialog() : closeDialog()
          }
        >
          <AssignmentDialogContent />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
