import { Controller, Get, Param } from "@nestjs/common";

import { BannerID, ShopID } from "../types";
import { BannerService } from "./banners.service";

@Controller("banners")
export class BannersController {
  constructor(private readonly bannerService: BannerService) {}
  @Get("banner/:bannerId")
  async get(@Param("bannerId") bannerId: BannerID): Promise<any> {
    return await this.bannerService.activeBanner(bannerId);
  }

  @Get("shop/:shopId")
  async getAll(@Param("shopId") shopId: ShopID): Promise<any> {
    return await this.bannerService.activeBanners(shopId);
  }
}
