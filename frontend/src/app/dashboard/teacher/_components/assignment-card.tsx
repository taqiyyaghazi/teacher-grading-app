'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { useAssignmentStore } from '@/stores/assignment-store';
import { Assignment } from '@/types/assignment';
import AssignmentDialogContent from './assignment-dialog-content';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const AssignmentCard = (props: Assignment) => {
  const { selectAssignment } = useAssignmentStore();
  return (
    <Card key={props.id} className="p-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
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
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => selectAssignment(props.id)}>Detail</Button>
          </DialogTrigger>
          <AssignmentDialogContent />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
