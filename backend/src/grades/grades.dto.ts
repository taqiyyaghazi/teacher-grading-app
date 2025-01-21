import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

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
