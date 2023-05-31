import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Foo } from '../models/foo.model';

@Resolver((of) => Foo)
export class FooResolver {
  @Query((returns) => Foo)
  aaa() {
    return 'sdf';
  }

  @ResolveField()
  async bar(@Parent() parent: Foo): Promise<string> {
    return '3333';
  }
}
