import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/users.interface';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
