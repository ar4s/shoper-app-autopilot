import * as graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ExecutorService } from "./executor/executor.service";

console.log("log", graphqlUploadExpress);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    methods: "GET",
  });
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 3 }));

  // const executerService = app.get<ExecutorService>(ExecutorService);
  // executerService.runPeriodicJob();

  await app.listen(3001);
}
bootstrap();
