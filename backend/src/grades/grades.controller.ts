import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { GradesService } from './grades.service';
import { CreateGradeRequestDto } from './grades.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/users/users.interface';
import { User, UserInfo } from 'src/common/decorators/user.decorator';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRole.STUDENT)
  @Post()
  create(@Body() body: CreateGradeRequestDto, @User() user: UserInfo) {
    return this.gradesService.create({ ...body, teacherId: user.id });
  }
}
