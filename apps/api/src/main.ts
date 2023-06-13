import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 3 }));
  await app.listen(3001);
}
bootstrap();
