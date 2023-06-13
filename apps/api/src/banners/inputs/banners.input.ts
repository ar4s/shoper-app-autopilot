import { Field, ID, InputType } from "@nestjs/graphql";

import { BannerID } from "../../types";
import { BannerEntity } from "../entities/banner.entity";

@InputType()
export class UpdateBannerInput implements Partial<BannerEntity> {
  @Field((type) => ID)
  id: BannerID;

  @Field()
  name: string;

  @Field()
  alternativeText: string;
}

@InputType()
export class CreateBannerInput implements Partial<BannerEntity> {
  @Field()
  name: string;

  @Field()
  alternativeText: string;
}
