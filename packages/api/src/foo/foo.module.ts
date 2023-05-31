import { Module } from '@nestjs/common';
import { FooResolver } from './foo.resolver';

@Module({
  providers: [FooResolver],
})
export class FooModule {}
