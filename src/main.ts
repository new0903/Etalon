import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import {
  join
} from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  
  app.useStaticAssets(join(__dirname, '..', '/uploads/'));
  
  app.setGlobalPrefix('api');
 // app.useStaticAssets(join(__dirname, '..', 'uploads'));
 // app.useStaticAssets(join(__dirname, '..', 'public'));
  //app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
