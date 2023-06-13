import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ImageBannerEntity } from '../entities/image.entity';

@ObjectType({ description: 'An Image of banner' })
export class BannerImage implements Partial<ImageBannerEntity> {
  @Field(() => ID)
  id: string;

  @Field()
  width?: number;

  @Field()
  height?: number;

  @Field()
  type?: 'jpeg' | 'png' | 'webp';

  @Field()
  totalBytes?: number;

  @Field()
  path?: string;

  @Field()
  isOriginal?: boolean;

  @Field()
  bucket?: string;

  @Field()
  url?: string;
}
