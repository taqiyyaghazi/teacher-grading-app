import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginPayload, LoginReturn } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: LoginPayload): Promise<LoginReturn> {
    const isUserExist = await this.prismaService.users.findUnique({
      where: { email: payload.email },
    });

    if (!isUserExist) {
      throw new BadRequestException('User not registered');
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      isUserExist.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = await this.jwtService.signAsync({
      id: isUserExist.id,
      role: isUserExist.role,
    });

    return { accessToken };
  }
}
