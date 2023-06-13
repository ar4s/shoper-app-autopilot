import { DataSource } from 'typeorm';

import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { streamToBuffer } from '../../utils';
import { ImageService } from '../image.service';
import { UploadInput } from '../inputs/image.input';
import { BannerImage } from '../models/image.model';

@Resolver((of) => BannerImage)
export class BannerImageResolver {
  constructor(
    private readonly imageService: ImageService,
    private readonly dataSource: DataSource,
  ) {}

  // @ResolveField()
  // url(@Parent() parent) {
  //   return `${parent.bucket}/${parent.path}`;
  // }

  @Mutation(() => Boolean)
  async uploadBannerImage(@Args('data') data: UploadInput) {
    console.log('DUPA');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const image = await data.image;
      const imageData = await streamToBuffer(image.createReadStream());
      await this.imageService.removeAll(data.id);
      await this.imageService.add(data.id, imageData);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return true;
  }
}
