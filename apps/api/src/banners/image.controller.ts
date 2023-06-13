import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImageService } from './image.service';

@Controller('banners')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(':bannerId/image')
  @UseInterceptors(FileInterceptor('file'))
  async optimizeImage(
    @Param('bannerId') bannerId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.imageService.add(bannerId, file.buffer);
  }
}
