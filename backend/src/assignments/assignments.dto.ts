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
