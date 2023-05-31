import { Job } from "bull";

import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";

import { periodicQueueName } from "../defaults";
import { TasksService } from "../tasks/tasks.service";
import { ExecutorService } from "./executor.service";
import { CHECK_TASKS_TO_DO, CheckToDoTasks } from "./types";

@Processor(periodicQueueName)
export class PeriodicConsumer {
  logger = new Logger(PeriodicConsumer.name);

  constructor(
    private readonly tasksService: TasksService,
    private readonly executorService: ExecutorService,
  ) {}

  @Process(CHECK_TASKS_TO_DO)
  async checkTasksToDo(job: Job<CheckToDoTasks>) {
    try {
      const jobs = await this.tasksService.checkJobToDo();
      jobs.forEach(async (job) => {
        await this.executorService.handleTask(job.id, job.payload);
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
