import { Injectable, CanActivate, ExecutionContext,UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
//import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {// implements CanActivate
  constructor(private reflector: Reflector,private readonly prismaService: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log("guards jwt auth guards")
    // console.log(context)
    // var args=context.getArgs();
    // console.log("headers")
    // console.log(args[0].rawHeaders)
    // console.log("body")
    // console.log(args[0].body)
    
    const request = context.switchToHttp().getRequest();
  //  console.log(request)
    const token = this.extractTokenFromHeader(request);
    
    console.log("JwtAuthGuard canActivate")
    console.log(token)
    
    if (isPublic) {
      return true;
    }
    if (token) {
      const user  = await this.prismaService.user.findFirst({
        where:{email:request.headers["email"]},
        include:{refreshToken:true}
      })
      try {
        if (token==user.refreshToken[0].token) {
          return true;
        }
        throw new UnauthorizedException();
      } catch (error) {
        
        throw new UnauthorizedException();
      }
    }
    throw new UnauthorizedException();
   
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}