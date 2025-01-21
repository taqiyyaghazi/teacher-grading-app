import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Grade } from './grades.interface';

export class CreateGradeRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  grade: number;

  @IsNotEmpty()
  @IsString()
  feedback: string;

  @IsNotEmpty()
  @IsString()
  assignmentId: string;
}

export class FindAllGradesByStudentIdResponseDto {
  id: string;
  subject: string;
  title: string;
  content: string;
  studentId: string;
  createdAt: Date;
  updatedAt: Date;
  grades: Grade[];
}
