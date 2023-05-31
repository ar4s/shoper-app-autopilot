import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BannerEntity } from "./banner.entity";

@Entity()
export class ImageBannerEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => BannerEntity, (banner) => banner.images, {
    nullable: true,
    onDelete: "CASCADE",
  })
  banner: BannerEntity;

  @Column({ default: false })
  isOriginal: boolean;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column({
    type: "enum",
    enum: ["jpeg", "png", "webp"],
  })
  type: "jpeg" | "png" | "webp";

  @Column()
  totalBytes: number;

  @Column()
  path: string;

  @Column()
  bucket: string;
}
