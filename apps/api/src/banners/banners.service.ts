import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BannerID, ShopID } from '../types';
import { BannerEntity } from './entities/banner.entity';
import { ImageBannerEntity } from './entities/image.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannersRepository: Repository<BannerEntity>,
    @InjectRepository(ImageBannerEntity)
    private readonly imagesRepository: Repository<ImageBannerEntity>,
  ) {}
  async banner(bannerId: BannerID): Promise<BannerEntity> {
    const banner = await this.bannersRepository.findOne({
      where: { id: bannerId },
    });
    return banner;
  }
  async updateBanner(
    id: BannerID,
    options: Pick<BannerEntity, 'name' | 'alternativeText'>,
  ) {
    const entity = await this.bannersRepository.findOne({
      where: { id: id },
    });
    const updatedEntity = { ...entity, ...options };
    this.bannersRepository.save(updatedEntity);
    return await this.banner(id);
  }

  async allBanners(shopId: ShopID): Promise<BannerEntity[]> {
    return await this.bannersRepository.find({
      where: { shopId },
      order: { updatedAt: 'DESC' },
    });
  }

  async bannerImages(bannerId: BannerID) {
    const images = await this.imagesRepository.find({
      where: { banner: { id: bannerId } },
      order: { width: 'ASC' },
    });
    return images;
  }

  async activeBanners(shopId: ShopID): Promise<BannerEntity[]> {
    return await this.bannersRepository.find({
      where: { shopId, enabled: true },
    });
  }

  async activeBanner(bannerId: BannerID): Promise<BannerEntity> {
    const banner = await this.bannersRepository.findOne({
      where: { id: bannerId, enabled: true },
    });
    return banner;
  }

  async createBanner(
    shopId: ShopID,
    options: { name: string; alternativeText: string },
  ): Promise<Partial<BannerEntity>> {
    try {
      const banner = await this.bannersRepository.insert({
        shopId,
        ...options,
      });

      return banner.generatedMaps[0];
    } catch (error) {
      throw new Error(error.detail);
    }
  }
  async removeBanner(bannerId: BannerID): Promise<void> {
    await this.bannersRepository.delete(bannerId);
  }

  async show(bannerId: BannerID): Promise<void> {
    await this.bannersRepository.update(bannerId, { enabled: true });
  }
  async hide(bannerId: BannerID): Promise<void> {
    await this.bannersRepository.update(bannerId, { enabled: false });
  }
}
