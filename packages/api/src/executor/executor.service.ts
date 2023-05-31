import { Queue } from "bull";

import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";

import { executorQueueName, periodicQueueName } from "../defaults";
import { TaskPayload } from "../tasks/types";
import { CHECK_TASKS_TO_DO, ExecutorJob, HANDLE_TASK } from "./types";

@Injectable()
export class ExecutorService {
  constructor(
    @InjectQueue(periodicQueueName)
    private readonly periodicQueue: Queue<ExecutorJob>,
    @InjectQueue(executorQueueName)
    private readonly queue: Queue<ExecutorJob>,
  ) {}

  async runPeriodicJob() {
    console.log("runPeriodicJob");

    await this.periodicQueue.add(
      CHECK_TASKS_TO_DO,
      { type: "checkTasksToDo", payload: 1 },
      {
        repeat: { cron: "* * * * * *" },
        removeOnComplete: { age: 3600, count: 120 },
        removeOnFail: { age: 3600, count: 120 },
      },
    );
  }
  async handleTask(taskId: string, payload: TaskPayload) {
    await this.queue.add(
      HANDLE_TASK,
      { type: "handleTask", taskId, payload },
      {
        priority: 100,
        attempts: 3,
        backoff: 1000,
        lifo: true,
        removeOnComplete: { age: 3600, count: 120 },
        removeOnFail: { age: 3600, count: 120 },
      },
    );
  }
}
