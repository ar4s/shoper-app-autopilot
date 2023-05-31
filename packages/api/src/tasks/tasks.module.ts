import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BannersModule } from "../banners/banners.module";
import { ProductsModule } from "../products/products.module";
import { TaskEntity } from "./entities/task.entity";
import { HandlerTaskService } from "./handler.service";
import { TasksResolver } from "./tasks.resolver";
import { TasksService } from "./tasks.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    BannersModule,
    ProductsModule,
  ],
  providers: [TasksResolver, TasksService, HandlerTaskService],
  exports: [TasksService],
})
export class TasksModule {}
