import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BullModule } from '@nestjs/bull';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FooModule } from './foo/foo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import corsConfig from './config/cors.config';
import shoperConfig from './config/shoper.config';
import bullConfig from './config/bull.config';
import { CoreModule } from './core/core.module';
import { ImageProcessingModule } from './image-processing/image-processing.module';
import { ProductsModule } from './products/products.module';
import { ExecutorModule } from './executor/executor.module';
import { FilesModule } from './files/files.module';
import { BannersModule } from './banners/banners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, corsConfig, shoperConfig, bullConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'timestamp',
      },
      csrfPrevention: false,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        limiter: {
          max: config.get('bull.max'),
          duration: 1000,
        },

        redis: {
          host: config.get('bull.host'),
          port: config.get('bull.port'),
          db: config.get('bull.db'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const dbUrl = new URL(config.get('database.url') || '');
        return {
          type: 'postgres',
          url: dbUrl.toString(),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),

    CoreModule,
    ImageProcessingModule,
    ProductsModule,
    // FooModule,
    ExecutorModule,
    FilesModule,
    BannersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
