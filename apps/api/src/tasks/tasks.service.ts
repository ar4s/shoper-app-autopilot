import { DataSource, LessThan, Repository } from "typeorm";

import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ShopID } from "../types";
import { TaskEntity } from "./entities/task.entity";
import { HandlerTaskService } from "./handler.service";
import { ExtractTaskByType, TaskPayload, TaskPayloadType } from "./types";

const dateOffset = 60;

@Injectable()
export class TasksService {
  readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    private readonly handlerTaskService: HandlerTaskService,
    private readonly dataSource: DataSource,
  ) {}

  async tasks(
    shopId: ShopID,
  ): Promise<
    { id: string; enabled: boolean; draft: boolean; payload: TaskPayload }[]
  > {
    const tasks = await this.tasksRepository.find({ where: { shopId } });

    return tasks.map((task) => {
      const { id, enabled, draft, payload } = task;
      return { id, enabled, draft, payload };
    });
  }

  async createTask<
    T extends TaskPayloadType,
    V extends TaskPayload = ExtractTaskByType<TaskPayload, T>,
  >(
    shopId: ShopID,
    triggerAt: Date,
    type: T,
    data: Omit<V, "type">,
  ): Promise<{ id: string; enabled: boolean; draft: boolean }> {
    const payload = { type, ...data } as unknown as V;

    const task = await this.tasksRepository.insert({
      shopId,
      triggerAt: triggerAt,
      payload,
    });

    const { id, enabled, draft } = task.generatedMaps[0];

    return { id, enabled, draft };
  }

  async checkJobToDo(): Promise<{ id: string; payload: TaskPayload }[]> {
    const maxDateTask = new Date();
    maxDateTask.setTime(maxDateTask.getTime() + dateOffset);

    const jobs = await this.tasksRepository.find({
      where: {
        enabled: true,
        draft: false,
        executed: false,
        triggerAt: LessThan(maxDateTask),
      },
    });

    return jobs.map((it) => ({ id: it.id, payload: it.payload }));
  }

  async executeTask(id: string, payload: TaskPayload): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.handlerTaskService.handle(payload);
      await this.tasksRepository.update(
        { id },
        { executed: true, executedAt: () => "now()::timestamptz" },
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      console.error(e);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
