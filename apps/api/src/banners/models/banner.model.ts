import { Field, ID, ObjectType } from '@nestjs/graphql';

import { BannerID } from '../../types';
import { BannerImage } from './image.model';

@ObjectType({ description: 'A banner' })
export class Banner {
  @Field(() => ID)
  id: BannerID;

  @Field()
  enabled: boolean;

  @Field()
  name: string;

  @Field()
  alternativeText: string;

  @Field()
  width: number;

  @Field()
  height: number;

  @Field(() => [BannerImage], { nullable: true })
  images: BannerImage[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  foo: string;
}
