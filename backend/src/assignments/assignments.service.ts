import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssignmentPayload } from './assignments.interface';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateAssignmentPayload): Promise<void> {
    await this.prismaService.assignments.create({ data: payload });
  }
}
