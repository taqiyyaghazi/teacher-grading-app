import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/users/users.interface';
import { PrismaService } from '../../prisma/prisma.service';

interface JWTPayload {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return false;

    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split('Bearer ')[1];

    if (!token) return false;

    try {
      const payload: JWTPayload = await this.jwtService.verifyAsync(token);

      if (roles.includes(payload.role)) {
        request.user = payload;
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
