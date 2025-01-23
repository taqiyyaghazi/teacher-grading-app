import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindThreeHoursAgoNotificationsReturn } from './notifications.interface';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findThreeHoursAgo(): Promise<FindThreeHoursAgoNotificationsReturn[]> {
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

    return this.prismaService.notifications.findMany({
      where: {
        createdAt: {
          gte: threeHoursAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        message: true,
        createdAt: true,
      },
      take: 3,
    });
  }
}
