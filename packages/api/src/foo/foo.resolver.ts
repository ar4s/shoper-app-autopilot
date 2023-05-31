import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Foo } from './foo.model';

@Resolver((of) => Foo)
export class FooResolver {
  @Query((returns) => Foo)
  aaa(): Foo {
    return new Foo();
  }

  @ResolveField()
  async baz(): Promise<string> {
    return '3333';
  }
}
