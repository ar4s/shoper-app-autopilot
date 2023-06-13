import { NestMinioModule } from "nestjs-minio";

import { Module } from "@nestjs/common";

import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  imports: [
    NestMinioModule.register({
      endPoint: "localhost",
      port: 3009,
      useSSL: false,
      accessKey: "minio1234",
      secretKey: "minio1234",
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
