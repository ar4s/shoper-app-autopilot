import * as sharp from 'sharp';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageProcessingService {
  async getImageWidth(file: Buffer): Promise<number> {
    const metadata = await sharp(file).metadata();
    return metadata.width;
  }

  async getImageSize(file: Buffer): Promise<{ width: number; height: number }> {
    const { width, height } = await sharp(file).metadata();
    return { width, height };
  }

  async getImageType(file: Buffer): Promise<'jpeg' | 'png' | 'webp'> {
    const metadata = await sharp(file).metadata();
    return metadata.format as 'jpeg' | 'png' | 'webp';
  }

  async resize(
    file: Buffer,
    width: number,
    format: 'jpeg' | 'png' | 'webp' = 'jpeg',
  ): Promise<{
    data: Buffer;
    width: number;
    height: number;
    totalBytes: number;
  }> {
    const image = await sharp(file)
      .resize({ width })
      .toFormat(format, { quality: 75 });
    const { data, info } = await image.toBuffer({ resolveWithObject: true });

    return {
      data,
      width: info.width,
      height: info.height,
      totalBytes: info.size,
    };
  }
}
