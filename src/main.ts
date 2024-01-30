import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  // validate body
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // set the default api path
  app.setGlobalPrefix('api/v1');

  const port = configService.get<number>('PORT') || 4000;
  const base_url = configService.get('BASE_URL');
  await app.listen(port, () => {
    console.log(`server available at ${base_url}:${port}`);
  });
}
bootstrap();
