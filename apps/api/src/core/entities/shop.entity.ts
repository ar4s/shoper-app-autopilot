import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class Shop {
  // global shop ID from shoper
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  shopHostname: string;

  @Column({ nullable: true })
  accessToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
