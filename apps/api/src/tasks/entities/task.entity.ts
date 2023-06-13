import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

import { TaskPayload } from "../types";

@Entity()
export class TaskEntity {
  @PrimaryColumn()
  @Generated("uuid")
  id: string;

  @Column()
  shopId: string;

  @Column("jsonb", { nullable: true })
  payload: TaskPayload;

  @Column({ default: true })
  enabled: boolean;

  @Column({ default: true })
  draft: boolean;

  @Column({ type: "timestamp with time zone" })
  triggerAt: Date;

  @Column({ default: false })
  executed: boolean;

  @Column({ type: "timestamp with time zone", nullable: true, default: null })
  executedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
