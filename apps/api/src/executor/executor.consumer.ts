import { Job } from "bull";

import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";

import { executorQueueName } from "../defaults";
import { TasksService } from "../tasks/tasks.service";
import { ExecutorService } from "./executor.service";
import { HANDLE_TASK, TaskToDo } from "./types";

@Processor(executorQueueName)
export class ExecutorConsumer {
  logger = new Logger(ExecutorConsumer.name);

  constructor(
    private readonly tasksService: TasksService,
    private readonly executorService: ExecutorService,
  ) {}

  @Process(HANDLE_TASK)
  async executeTask(job: Job<TaskToDo>) {
    this.logger.log(`executeJob: ${job.data}`);
    const jobToDo = await this.tasksService.executeTask(
      job.data.taskId,
      job.data.payload,
    );
  }
}
