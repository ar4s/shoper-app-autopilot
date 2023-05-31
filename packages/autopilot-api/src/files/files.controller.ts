import { Controller, Param, Post } from "@nestjs/common";

import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post("/:name")
  async createBucket(@Param("name") bucketName: string): Promise<any> {
    return await this.filesService.createBucket(bucketName);
  }
}
