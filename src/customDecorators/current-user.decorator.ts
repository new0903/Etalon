import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
  //  console.log(request)
    return request["user"]; // Здесь предполагается, что данные пользователя хранятся в req.user
  },
);