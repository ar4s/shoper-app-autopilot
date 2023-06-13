import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { BannerID, ShopID } from '../../types';
import { BannerService } from '../banners.service';
import { CreateBannerInput, UpdateBannerInput } from '../inputs/banners.input';
import { Banner } from '../models/banner.model';

@Resolver((of) => Banner)
export class BannersResolver {
  constructor(private readonly bannersService: BannerService) {}

  @Query((returns) => Banner)
  async banner(@Args({ name: 'id', type: () => ID }) id: BannerID) {
    return await this.bannersService.banner(id);
  }

  @Query((returns) => [Banner])
  async banners(@Args({ name: 'shopId', type: () => ID }) shop: ShopID) {
    return await this.bannersService.allBanners(shop);
  }

  @ResolveField()
  async images(@Parent() parent: Banner) {
    return await this.bannersService.bannerImages(parent.id);
  }

  @Mutation(() => Banner)
  async updateBanner(@Args('data') data: UpdateBannerInput) {
    const { id, ...options } = data;
    return await this.bannersService.updateBanner(id, options);
  }

  @Mutation((returns) => Banner)
  async createBanner(
    @Args({ name: 'shopId', type: () => ID }) shop: ShopID,
    @Args('data') data: CreateBannerInput,
  ) {
    const banner = await this.bannersService.createBanner(shop, data);
    return { ...data, ...banner };
  }

  @Mutation(() => String)
  async removeBanner(
    @Args({ name: 'bannerId', type: () => ID }) bannerId: BannerID,
  ) {
    await this.bannersService.removeBanner(bannerId);
    return 'removed';
  }
}
