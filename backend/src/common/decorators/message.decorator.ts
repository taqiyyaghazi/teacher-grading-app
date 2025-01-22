import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { MessageInterceptor } from '../interceptors/message.interceptor';

export function Message(message: string) {
  return applyDecorators(UseInterceptors(new MessageInterceptor(message)));
}
