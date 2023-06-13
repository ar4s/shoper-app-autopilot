import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { BannerEntity } from './banners/entities/banner.entity';
import { ImageBannerEntity } from './banners/entities/image.entity';
import { Shop } from './core/entities/shop.entity';
import { TaskEntity } from './tasks/entities/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL === 'true',
  schema: 'public',
  entities: [BannerEntity, ImageBannerEntity, Shop, TaskEntity],
});
