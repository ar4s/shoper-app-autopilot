import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfiguratorController } from "./configurator.controller";
import { Shop } from "./entities/shop.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), HttpModule],
  controllers: [ConfiguratorController],
})
export class CoreModule {}
