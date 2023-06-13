import { z } from "zod";

import { registerAs } from "@nestjs/config";

const Params = z.object({
  host: z.string(),
  port: z.number(),
  db: z.number(),
  max: z.number(),
});

export default registerAs("bull", () => {
  const values = {
    port: process.env.BULL_PORT || 6379,
    host: process.env.BULL_HOST || "localhost",
    db: process.env.BULL_DB || 3,
    max: process.env.BULL_MAX || 3,
  };
  Params.parse(values);
  return values;
});
