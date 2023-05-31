import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { FilesService } from "../files/files.service";
import { ImageProcessingService } from "../image-processing/image-processing.service";
import { BannerID } from "../types";
import { ImageBannerEntity } from "./entities/image.entity";

const IMAGE_BREAKPOINTS = [320, 640, 960, 1280, 1920, 2560];
const SUPPORTED_FORMATS = ["jpeg", "webp"] as const;

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageBannerEntity)
    private readonly imagesRepository: Repository<ImageBannerEntity>,
    private readonly imageProcessingService: ImageProcessingService,
    private readonly filesService: FilesService,
  ) {}

  getPath(bannerId: string): string {
    const randomName = Date.now().toString(16);
    return `${bannerId.slice(0, 4)}/${randomName.slice(-2)}/${randomName}`;
  }

  async addOriginal(
    id: string,
    bucket: string,
    path: string,
    image: Buffer,
  ): Promise<void> {
    const type = await this.imageProcessingService.getImageType(image);
    const fullPath = `${path}/original.${type}`;
    await this.filesService.addFileToBucket(bucket, fullPath, image);
    await this.imagesRepository.insert({
      ...(await this.imageProcessingService.getImageSize(image)),
      type,
      isOriginal: true,
      totalBytes: image.byteLength,
      path: fullPath,
      banner: { id },
      bucket,
    });
  }

  async removeAll(bannerId: BannerID): Promise<void> {
    const images = await this.imagesRepository.find({
      where: { banner: { id: bannerId } },
    });

    const paths = images.map((image) => ({
      path: image.path,
      bucket: image.bucket,
    }));
    paths.forEach(({ bucket, path }) =>
      this.filesService.removeFileFromBucket(bucket, path),
    );

    await this.imagesRepository.remove(images);
  }

  async generateBreakpoints(
    bannerId: string,
    bucket: string,
    path: string,
    image: Buffer,
  ): Promise<void> {
    const imageWidth = await this.imageProcessingService.getImageWidth(image);
    return new Promise((resolve) => {
      SUPPORTED_FORMATS.forEach(async (format) => {
        IMAGE_BREAKPOINTS.filter((v) => v < imageWidth).forEach(
          async (breakpoint) => {
            const { data, height, width, totalBytes } =
              await this.imageProcessingService.resize(
                image,
                breakpoint,
                format,
              );
            const fullPath = `${path}/${breakpoint}w.${format}`;

            await this.filesService.addFileToBucket(bucket, fullPath, data);
            await this.imagesRepository.insert({
              width,
              height,
              type: format,
              totalBytes,
              path: fullPath,
              banner: { id: bannerId },
              bucket,
            });
          },
        );
      });
      resolve();
    });
  }

  async add(bannerId: string, image: Buffer): Promise<void> {
    const bucket = "banners";
    const path = this.getPath(bannerId);

    await this.addOriginal(bannerId, bucket, path, image);
    await this.generateBreakpoints(bannerId, bucket, path, image);
  }
}
