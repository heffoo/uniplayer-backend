import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Package from '../package.json';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('UniPlayer')
    .setVersion(Package.version)
    .addTag(
      'auth',
      'Модуль регистрации, аутентификации и авторизации пользователей',
    )
    .addTag('users', 'Модуль пользователей')
    .addTag('playlists', 'Модуль плейлистов')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
