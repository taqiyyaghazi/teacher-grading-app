import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/users/users.interface';

export interface UserInfo {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
