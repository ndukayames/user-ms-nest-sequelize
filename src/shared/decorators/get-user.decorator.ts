import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return data ? result?.[data] : result;
  },
);
