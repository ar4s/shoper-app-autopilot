import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: process.env.PORT || 3300,
  api_host: process.env.API_HOST || "source-apps.eu.ngrok.io",
  ui_host: process.env.UI_HOST || "source-apps.eu.ngrok.io",
  settings_public_cache: process.env.SETTINGS_PUBLIC_CACHE || "300",
}));
