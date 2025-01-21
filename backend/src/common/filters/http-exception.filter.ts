import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as {
      message: string[] | string;
    };

    let errorMessage: string;
    if (typeof exceptionResponse.message === 'object') {
      errorMessage = exceptionResponse.message[0];
    } else {
      errorMessage = exceptionResponse.message;
    }

    response.status(status).json({
      message: errorMessage,
    });
  }
}
