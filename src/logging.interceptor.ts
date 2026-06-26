import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const method = request.method;
    const url = request.url;
    console.log(`[Request đi vào] ${method}${url}`);
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(
          `[Response đi ra] ${method}${url} - Xử lý mất ${duration}ms`,
        );
      }),
    );
  }
}
