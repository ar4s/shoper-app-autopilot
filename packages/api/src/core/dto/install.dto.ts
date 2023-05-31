import { IsString } from "class-validator";

export class InstallDto {
  @IsString()
  id: string;

  @IsString()
  shopURL: string;
}
