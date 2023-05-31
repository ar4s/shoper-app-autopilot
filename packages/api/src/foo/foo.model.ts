import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Foo {
  constructor() {
    this.bar = 'foo';
  }
  @Field()
  bar: string;

  @Field()
  baz: string;
}
