import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateGradePayload,
  FindAllGradesByStudentIdPayload,
  FindAllGradesByStudentIdReturn,
} from './grades.interface';

@Injectable()
export class GradesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(payload: CreateGradePayload): Promise<void> {
    const isAssignmentExist = await this.prismaService.assignments.findUnique({
      where: { id: payload.assignmentId },
    });

    if (!isAssignmentExist) {
      throw new BadRequestException('Assignment not found');
    }

    if (isAssignmentExist.gradeId) {
      throw new BadRequestException('Assignment already graded');
    }

    const createdGrade = await this.prismaService.grades.create({
      data: {
        feedback: payload.feedback,
        grade: payload.grade,
        teacherId: payload.teacherId,
      },
    });

    await this.prismaService.assignments.update({
      where: { id: payload.assignmentId },
      data: {
        gradeId: createdGrade.id,
      },
    });
  }

  async findAllByStudentId({
    studentId,
    userId,
  }: FindAllGradesByStudentIdPayload): Promise<
    FindAllGradesByStudentIdReturn[]
  > {
    if (userId !== studentId) {
      throw new ForbiddenException('You can only view your own grades');
    }

    return this.prismaService.assignments.findMany({
      where: {
        studentId,
      },
      include: {
        grade: true,
      },
    });
  }
}
