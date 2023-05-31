import { Injectable } from "@nestjs/common";

import { BannerService } from "../banners/banners.service";
import { ProductsService } from "../products/products.service";
import { bannerId } from "../utils";
import { TaskPayload } from "./types";

@Injectable()
export class HandlerTaskService {
  constructor(
    private readonly bannersService: BannerService,
    private readonly productsService: ProductsService,
  ) {}

  async handle(payload: TaskPayload) {
    switch (payload.type) {
      case "banner_hide":
        console.log("banner_hide");

        await this.bannersService.hide(bannerId(payload.bannerId));
        break;

      case "banner_show":
        await this.bannersService.show(bannerId(payload.bannerId));
        break;

      case "product_disable_a_product_of_the_day":
        await this.productsService.disableProductOfTheDay(payload.productId);
        break;

      case "product_enable_a_product_of_the_day":
        await this.productsService.enableProductOfTheDay(payload.productId);
        break;

      default:
        // TODO: handle unknown task or satisfy typescript
        // payload as never;
        throw new Error(`Unknown task type`);
    }
  }
}
