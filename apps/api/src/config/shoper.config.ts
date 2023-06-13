import { registerAs } from "@nestjs/config";

export default registerAs("shoper", () => ({
  appId: process.env.SHOPER_APPLICATION_ID,
  appSecret: process.env.SHOPER_APPLICATION_SECRET,
  secret: process.env.SHOPER_SECRET,
  webhookSecret: process.env.SHOPER_WEBHOOK_SECRET,
}));
