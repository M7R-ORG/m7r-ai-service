import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomEventPatternInterceptor } from './interceptors/custom-event-pattern.interceptor';

export function CustomEventPattern(pattern: string) {
  return applyDecorators(
    MessagePattern(pattern),
    UseInterceptors(new CustomEventPatternInterceptor()),
  );
}

export const ReqUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
