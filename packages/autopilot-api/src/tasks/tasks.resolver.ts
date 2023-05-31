import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";

import { shopId } from "../utils";
import { Task } from "./models/task.model";
import { TasksService } from "./tasks.service";

@Resolver((of) => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query((returns) => [Task])
  async tasks(
    @Args({ name: "shopId", type: () => ID }) shop: string,
  ): Promise<Task[]> {
    return await this.tasksService.tasks(shopId(shop));
  }

  @Mutation((returns) => Task)
  async createTaskBannerShow(
    @Args({ name: "shopId", type: () => ID }) shop: string,
    @Args({ name: "bannerId", type: () => ID }) bannerId: string,
    @Args({ name: "triggerAt", type: () => Date }) triggerAt: Date,
  ) {
    const task = this.tasksService.createTask(
      shopId(shop),
      new Date(triggerAt),
      "banner_show",
      {
        bannerId,
      },
    );
    return task;
  }

  @Mutation((returns) => Task)
  async createTaskBannerHide(
    @Args({ name: "shopId", type: () => ID }) shop: string,
    @Args({ name: "bannerId", type: () => ID }) bannerId: string,
    @Args({ name: "triggerAt", type: () => Date }) triggerAt: Date,
  ) {
    console.log("createTaskBannerHide", shop, bannerId, triggerAt);

    const task = this.tasksService.createTask(
      shopId(shop),
      new Date(triggerAt),
      "banner_hide",
      {
        bannerId,
      },
    );
    return task;
  }

  @Mutation((returns) => Task)
  async createTaskProductEnableProductOfTheDay(
    @Args({ name: "shopId", type: () => ID }) shop: string,
    @Args({ name: "productId", type: () => ID }) productId: string,
    @Args({ name: "triggerAt", type: () => Date }) triggerAt: Date,
  ) {
    const task = this.tasksService.createTask(
      shopId(shop),
      new Date(triggerAt),
      "product_enable_a_product_of_the_day",
      {
        productId,
      },
    );
    return task;
  }

  @Mutation((returns) => Task)
  async createTaskProductDisableProductOfTheDay(
    @Args({ name: "shopId", type: () => ID }) shop: string,
    @Args({ name: "productId", type: () => ID }) productId: string,
    @Args({ name: "triggerAt", type: () => Date }) triggerAt: Date,
  ) {
    const task = this.tasksService.createTask(
      shopId(shop),
      new Date(triggerAt),
      "product_disable_a_product_of_the_day",
      {
        productId,
      },
    );
    return task;
  }
}
