import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { GradesService } from './grades.service';
import { CreateGradeRequestDto } from './grades.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/users/users.interface';
import { User, UserInfo } from 'src/common/decorators/user.decorator';
import { FindAllAssignmentsResponseDto } from 'src/assignments/assignments.dto';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRole.TEACHER)
  @Post()
  create(
    @Body() body: CreateGradeRequestDto,
    @User() user: UserInfo,
  ): Promise<void> {
    return this.gradesService.create({ ...body, teacherId: user.id });
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.STUDENT)
  @Get(':studentId')
  findByStudentId(
    @Param('studentId') studentId: string,
    @User() user: UserInfo,
  ): Promise<FindAllAssignmentsResponseDto[]> {
    return this.gradesService.findAllByStudentId({
      studentId,
      userId: user.id,
    });
  }
}
