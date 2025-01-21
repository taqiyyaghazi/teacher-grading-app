import { Injectable } from '@nestjs/common';
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
    await this.prismaService.assignments.create({ data: payload });
  }

  async findAll({
    subject,
  }: FindAllAssignmentsPayload): Promise<FindAllAssignmentsReturn[]> {
    return this.prismaService.assignments.findMany({
      where: {
        ...(subject && { subject }),
      },
    });
  }
}
