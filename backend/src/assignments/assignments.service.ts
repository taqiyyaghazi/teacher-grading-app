import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateAssignmentPayload,
  FindAllAssignmentsPayload,
  FindAllAssignmentsReturn,
} from './assignments.interface';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateAssignmentPayload): Promise<void> {
    const user = await this.prismaService.users.findUnique({
      where: { id: payload.studentId },
    });

    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    const assignment = await this.prismaService.assignments.create({
      data: payload,
      select: { title: true },
    });

    await this.prismaService.notifications.create({
      data: {
        userId: user.id,
        message: `New assignment submitted by: ${user.name} with title: "${assignment.title}".`,
      },
    });
  }

  async findAll({
    subject,
  }: FindAllAssignmentsPayload): Promise<FindAllAssignmentsReturn[]> {
    return this.prismaService.assignments.findMany({
      where: {
        ...(subject && { subject }),
      },
      select: {
        createdAt: true,
        id: true,
        title: true,
        subject: true,
        content: true,
        student: {
          select: {
            name: true,
          },
        },
        grade: {
          select: {
            createdAt: true,
            grade: true,
            feedback: true,
            teacher: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        gradeId: 'asc',
      },
    });
  }
}
