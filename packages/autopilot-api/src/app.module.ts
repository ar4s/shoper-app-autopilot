import GraphQLJSON from "graphql-type-json";
import { join } from "path";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BannersModule } from "./banners/banners.module";
import appConfig from "./config/app.config";
import bullConfig from "./config/bull.config";
import corsConfig from "./config/cors.config";
import databaseConfig from "./config/database.config";
import shoperConfig from "./config/shoper.config";
import { CoreModule } from "./core/core.module";
import { ExecutorModule } from "./executor/executor.module";
import { FilesModule } from "./files/files.module";
import { ImageProcessingModule } from "./image-processing/image-processing.module";
import { ProductsModule } from "./products/products.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    CoreModule,
    ExecutorModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // resolvers: { JSON: GraphQLJSON },
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      // buildSchemaOptions: {
      //   numberScalarMode: "integer",
      //   dateScalarMode: "timestamp",
      // },
      // csrfPrevention: false,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        limiter: {
          max: config.get("bull.max"),
          duration: 1000,
        },

        redis: {
          host: config.get("bull.host"),
          port: config.get("bull.port"),
          db: config.get("bull.db"),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const dbUrl = new URL(config.get("database.url") || "");
        return {
          type: "postgres",
          url: dbUrl.toString(),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, corsConfig, shoperConfig, bullConfig],
    }),

    // ExecutorModule,
    // ImageProcessingModule,
    // TasksModule,
    // ProductsModule,
    // BannersModule,
    // FilesModule,
  ],
})
export class AppModule {}
