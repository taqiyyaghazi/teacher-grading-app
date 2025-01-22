import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AssignmentSubject } from './assignments.interface';

export class CreateAssignmentRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(AssignmentSubject)
  subject: AssignmentSubject;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class FindAllAssignmentsResponseDto {
  id: string;
  subject: string;
  title: string;
  content: string;
  student: { name: string };
  grade: {
    createdAt: Date;
    feedback: string;
    grade: number;
    teacher: { name: string };
  } | null;
  createdAt: Date;
}
