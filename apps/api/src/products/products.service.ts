import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {
  async enableProductOfTheDay(productId: string): Promise<void> {}
  async disableProductOfTheDay(productId: string): Promise<void> {}
}
