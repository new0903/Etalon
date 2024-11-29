import { Injectable, CanActivate, ExecutionContext,UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
//import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {// implements CanActivate
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log("guards jwt auth guards")
    console.log(context)
    var args=context.getArgs();
    console.log("headers")
    console.log(args[0].rawHeaders)
    console.log("body")
    console.log(args[0].body)
    
    const request = context.switchToHttp().getRequest();
    console.log(request)
    const token = this.extractTokenFromHeader(request);
    console.log(token)
    if (isPublic) {
      return true;
    }
    if (token) {
      
    }
    try {
      if (token==process.env.JWT_SECRET) {
        
     
        return true;
      }
      throw new UnauthorizedException();
    } catch (error) {
      
      throw new UnauthorizedException();
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}