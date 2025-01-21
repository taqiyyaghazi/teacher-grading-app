import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentRequestDto } from './assignments.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/users/users.interface';
import { User, UserInfo } from 'src/common/decorators/user.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRole.STUDENT)
  @Post()
  async createAssignment(
    @Body() body: CreateAssignmentRequestDto,
    @User() user: UserInfo,
  ): Promise<void> {
    await this.assignmentsService.create({ ...body, studentId: user.id });
  }
}
