import { Repository } from "typeorm";

import { Body, Controller, Logger, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AccessTokenDto } from "./dto/accessToken.dto";
import { InstallDto } from "./dto/install.dto";
import { Shop } from "./entities/shop.entity";

@Controller("/configurator")
export class ConfiguratorController {
  readonly logger = new Logger(ConfiguratorController.name);
  constructor(
    @InjectRepository(Shop) private readonly shopsRepository: Repository<Shop>,
  ) {}

  @Post("install")
  async install(@Body() body: InstallDto): Promise<any> {
    const { shopURL, id } = body;
    const shopHostname = new URL(shopURL).hostname;

    try {
      await this.shopsRepository.insert({
        id,
        shopHostname,
        accessToken: "<undefined>",
      });
    } catch (e) {
      this.logger.error("shop already exists, nothing to do");
    }

    return "created";
  }

  @Post("access-token")
  async accessToken(@Body() body: AccessTokenDto): Promise<any> {
    const { id, accessToken } = body;
    this.logger.log(
      `Change access token for ${id} is ${accessToken.slice(0, 5)}...}`,
    );
    await this.shopsRepository.update(
      {
        id,
      },
      { accessToken },
    );

    return "ok";
  }
}
