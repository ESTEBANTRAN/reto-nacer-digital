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
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (server-to-server, curl, health checks)
      if (!origin) return callback(null, true);

      // Allow exact matches from ALLOWED_ORIGINS
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow Vercel preview deployment URLs (*.vercel.app)
      if (origin.endsWith('.vercel.app')) return callback(null, true);

      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
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
