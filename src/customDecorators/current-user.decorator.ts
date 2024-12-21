import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
  //  console.log(request)
    let payload={
      Email:request.headers["email"],
      Login:request.headers["login"]
    }
    return payload; // Здесь предполагается, что данные пользователя хранятся в req.user
  },
);