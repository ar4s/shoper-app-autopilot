import { Stream } from "stream";

export type ShopID = string & { __brand: "ShopID" };
export type BannerID = string & { __brand: "BannerID" };

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
