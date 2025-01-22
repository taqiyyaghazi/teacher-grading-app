import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { AssignmentGrade } from '@/types/assignment';
import { Separator } from '@radix-ui/react-separator';

const GradeCard = (props: AssignmentGrade) => {
  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle className="flex flex-wrap gap-2 justify-between items-center">
          <p>{props.title}</p>
        </CardTitle>
        <CardDescription>
          Submitted At {formatDate(props.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.content}</p>
      </CardContent>
      {props.grade && (
        <CardFooter className="space-x-4 flex items-start">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold">Grade</p>
            <p className="font-semibold text-2xl">{props.grade.grade}</p>
          </div>
          <Separator orientation="vertical" />
          <div>
            <p className="font-bold">Feedback</p>
            <p>{props.grade.feedback}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default GradeCard;
