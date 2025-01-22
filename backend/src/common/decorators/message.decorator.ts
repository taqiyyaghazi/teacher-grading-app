import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../interceptors/response.interceptor';

export function Message(message: string) {
  return applyDecorators(UseInterceptors(new ResponseInterceptor(message)));
}
