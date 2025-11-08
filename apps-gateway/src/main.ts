import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const cfg = new DocumentBuilder()
    .setTitle('World Data Explorer')
    .setVersion('v1')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'apiKey')
    .build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('/docs', app, doc);

  const port = Number(process.env.PORT || 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
