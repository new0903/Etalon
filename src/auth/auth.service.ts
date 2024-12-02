import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import { env } from 'process';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { AuthUserDTO } from './dto/reg.data.dto';
  import { UserService } from 'src/user/user.service';
  import { JwtService } from '@nestjs/jwt';
  import { randomBytes } from 'crypto';
  import { Response } from 'express';
  import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
 // import { PrismaSelectData } from 'src/prisma/prisma.select.data';

  
@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
      ) {}
    
      async RegisterNewUserService(regData: AuthUserDTO) {
        const hashedPass = await this.cryptUserPasswordService(regData.password);
        try {
          return await this.prismaService.user.create({
            data: {
              email: regData.email,
              login: regData.login,
              password: hashedPass,
            }
          });
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
      }
    
      async UserLoginService(data: AuthUserDTO) {
        const user = await this.userService.findOne(data.email);
        if (
          user &&
          (await this.decryptUserPsswordService(data.password, user.password))
        ) {
          const refreshToken = await this.setRefreshToken(user.id);
    
          const accessToken = await this.createToken(user.id, user.email);
    
          return { accessToken: accessToken, refreshToken: refreshToken };
        } else {
          throw new HttpException(
            'user is not exist or pass is not correct',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    
      async RefreshTokens(refreshToken: string) {
        try {
          const token = await this.prismaService.refreshToken.findFirst({
            where: { token: refreshToken },
          });
    
          if (!token && !(new Date(token.expDate) < new Date())) {
            throw new UnauthorizedException();
          }
          const user = await this.prismaService.user.findFirst({
            where: { id: token.userId },
          });
          const newRefreshToken = await this.setRefreshToken(token.userId);
          const newAccessToken = await this.createToken(token.userId, user.email);
    
          return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
      }
    
      async cryptUserPasswordService(pass: string) {
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hashSync(pass, salt);
      }
    
      async decryptUserPsswordService(pass: string, hash: string) {
        return bcrypt.compareSync(pass, hash);
      }
    
      async createToken(userId: string, email: string) {
        const user = await this.prismaService.user.update({
          where: { id: userId },
          data: {
            acessTokenLastSerial: {increment:1},
          },
          include: { refreshToken: true}
        });
        const payload = {
          email:email,
          id: userId,
          token:user.refreshToken[0].token,
          issueNumber: user.acessTokenLastSerial,
        };
   //    const jwtSign=this.jwtService.sign(payload)
      //  console.log(user)
       // console.log(payload)
        //console.log(jwtSign)
        return 'Bearer ' + user.refreshToken[0].token;//'Bearer ' +jwtSign
      }
    
      async setRefreshToken(userId: string) {
        try {
          const existToken = await this.findRefreshToken(userId);
    
          const tokenExpDays =parseInt(process.env.REFRESH_TOKEN_EXP)// 10;
          let tokenExp =new Date();
          var dateTime=  tokenExp;
          tokenExp.setDate(tokenExp.getDate() + tokenExpDays);
          const newToken = await this.generateRefreshToken(40);
       
          let dbToken;
          if (existToken) {
            console.log("exitToken")
            dbToken = await this.prismaService.refreshToken.update({
              where: { id: existToken.id },
              data: {
                token: newToken,
                expDate: tokenExp,
              },
            });
          } else {
            console.log("tokenExp")
            dbToken = await this.prismaService.refreshToken.create({
              data: {
                token: newToken,
                expDate: tokenExp,
                userId: userId,
              },
            });
            console.log(dbToken)
          }
          return dbToken.token;
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
      }
    
      async findRefreshToken(userId: string) {
        return await this.prismaService.refreshToken.findFirst({
          where: { userId: userId },
          include: { user: true },
        });
      }
    
      async generateRefreshToken(length: number) {
        const bytes = Math.ceil((length * 3) / 4);
        const token = randomBytes(bytes).toString('base64');
        return token
          .substring(0, length)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      }
}
