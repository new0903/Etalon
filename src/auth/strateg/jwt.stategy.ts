import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
//import { Strategy } from 'passport-local';//from 'passport-jwt';//ExtractJwt
import { Strategy ,ExtractJwt} from 'passport-jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import {Request} from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
       ignoreExpiration: false,
       secretOrKey: process.env.JWT_SECRET,
      
    });
   
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService
      .findOne(payload.email)
      .catch((err) => {
        return null;
      });
      console.log(user);

    if (!user || user.acessTokenLastSerial != payload.issueNumber) {
      console.log("123");
      throw new UnauthorizedException();
    }

    if (!user || user.refreshToken[0].token != payload.acessToken) {
      console.log("1234");
      throw new UnauthorizedException();
    }
    // if (user.isBanned) {
    //   throw new HttpException(
    //     'your account has been blocked',
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    console.log(payload);

    return payload;
  }
}
