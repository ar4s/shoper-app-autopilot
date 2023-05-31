import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

import { Field, ID, InputType } from "@nestjs/graphql";

import { BannerID, FileUpload } from "../../types";

@InputType()
export class UploadInput {
  @Field(() => ID)
  id: BannerID;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
