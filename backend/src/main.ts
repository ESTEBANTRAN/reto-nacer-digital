// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // ─── Global Pipes ───
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ─── Global Exception Filter ───
  app.useGlobalFilters(new HttpExceptionFilter());

  // ─── CORS Configuration ───
  const allowedOrigins = configService
    .get<string>('ALLOWED_ORIGINS', 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''));

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET'],
    credentials: false,
  });

  // ─── Dynamic Port (required for Render) ───
  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);

  console.log(`🚀 Backend running on port ${port}`);
  console.log(`📡 CORS enabled for: ${allowedOrigins.join(', ')}`);
}

bootstrap();
