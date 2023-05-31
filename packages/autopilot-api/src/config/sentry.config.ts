import { z } from "zod";

import { registerAs } from "@nestjs/config";

const Sentry = z.object({
  dsn: z.string().url().optional(),
  environment: z.union([z.literal("development"), z.literal("production")]),
});

export default registerAs("sentry", () => {
  const values = {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || "development",
  };
  Sentry.parse(values);
  return values;
});
