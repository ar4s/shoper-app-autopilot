import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

import { BannerID } from "../../types";
import { ImageBannerEntity } from "./image.entity";

@Entity()
export class BannerEntity {
  @PrimaryGeneratedColumn("uuid")
  id: BannerID;

  @Column()
  shopId: string;

  @Column({ unique: true, length: 100 })
  name: string;

  @Column({ length: 150 })
  alternativeText: string;

  @Column({ default: false })
  enabled: boolean;

  @OneToMany(() => ImageBannerEntity, (image) => image.banner, {
    cascade: true,
    onDelete: "CASCADE",
  })
  images: ImageBannerEntity[];

  // TODO: add original image
  // @Column()
  // originalImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
