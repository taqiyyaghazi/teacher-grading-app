import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserPayload } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateUserPayload): Promise<void> {
    const userExist = await this.prismaService.users.findUnique({
      where: { email: payload.email },
    });

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    await bcrypt.hash(payload.password, 10);

    await this.prismaService.users.create({
      data: payload,
    });
  }
}
