export type TaskPayloadType =
  | "banner_show"
  | "banner_hide"
  | "product_enable_a_product_of_the_day"
  | "product_disable_a_product_of_the_day";

interface ITaskPayload {
  type: TaskPayloadType;
}

export interface IBannerShowTask extends ITaskPayload {
  type: "banner_show";
  bannerId: string;
}

export interface IBannerHideTask extends ITaskPayload {
  type: "banner_hide";
  bannerId: string;
}

export interface IProductMarkAsAProductOfTheDayTask extends ITaskPayload {
  type: "product_enable_a_product_of_the_day";
  productId: string;
}

export interface IProductUnmarkAsAProductOfTheDayTask extends ITaskPayload {
  type: "product_disable_a_product_of_the_day";
  productId: string;
}

export type TaskPayload =
  | IBannerShowTask
  | IBannerHideTask
  | IProductMarkAsAProductOfTheDayTask
  | IProductUnmarkAsAProductOfTheDayTask;

export type ExtractTaskByType<
  T extends TaskPayload,
  K extends TaskPayloadType,
> = Extract<T, { type: K }>;
