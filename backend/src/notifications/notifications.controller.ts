import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/users/users.interface';
import { GetNotificationsDto } from './notifications.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Roles(UserRole.TEACHER)
  async getNotifications(): Promise<GetNotificationsDto[]> {
    return this.notificationsService.findThreeHoursAgo()
  }
}
