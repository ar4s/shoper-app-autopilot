import { Stream } from "stream";

import { BannerID, ShopID } from "./types";

export const shopId = (id: string): ShopID => {
  return id as ShopID;
};

export const bannerId = (id: string): BannerID => {
  return id as BannerID;
};

export const streamToBuffer = async (stream: Stream): Promise<Buffer> => {
  return new Promise<Buffer>(async (resolve, reject) => {
    const _buff = [];

    stream.on("data", (chunk) => _buff.push(chunk));
    stream.on("end", () => {
      resolve(Buffer.concat(_buff));
    });
    stream.on("error", (err) => reject(err));
  });
};
