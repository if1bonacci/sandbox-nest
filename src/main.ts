import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['error', 'warn'],
  // });
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     validationError: { target: false },
  //   }),
  // );
  // app.useGlobalFilters(new ValidationException());
  app.enableCors();
  await app.listen(process.env.SERVICE_PORT);
}
bootstrap();
