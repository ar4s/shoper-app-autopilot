import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Foo {
  @Field()
  bar: string;
}
