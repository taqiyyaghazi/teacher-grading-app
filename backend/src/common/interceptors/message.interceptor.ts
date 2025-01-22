import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  result: T;
  message: string;
}

@Injectable()
export class MessageInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly message: string) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          result: data,
          message: this.message,
        };
      }),
    );
  }
}
