import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule } from '../files/files.module';
import { ImageProcessingModule } from '../image-processing/image-processing.module';
import { BannersController } from './banners.controller';
import { BannerService } from './banners.service';
import { BannerEntity } from './entities/banner.entity';
import { ImageBannerEntity } from './entities/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { BannersResolver } from './resolvers/banners.resolver';
import { FooResolver } from './resolvers/foo.resolver';
import { BannerImageResolver } from './resolvers/image.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerEntity, ImageBannerEntity]),
    ImageProcessingModule,
    FilesModule,
  ],
  providers: [
    BannerService,
    BannersResolver,
    ImageService,
    BannerImageResolver,
    FooResolver,
  ],
  exports: [BannerService],
  controllers: [ImageController, BannersController],
})
export class BannersModule {}
