import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { parseCorsOrigin } from './common/utils/parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({ origin: parseCorsOrigin(process.env.CORS_ORIGIN) });

  await app.listen(3001);
}
bootstrap();
