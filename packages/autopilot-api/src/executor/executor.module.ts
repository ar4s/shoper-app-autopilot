import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { executorQueueName, periodicQueueName } from "../defaults";
import { TasksModule } from "../tasks/tasks.module";
import { ExecutorConsumer } from "./executor.consumer";
import { ExecutorService } from "./executor.service";
import { PeriodicConsumer } from "./periodic.consumer";

@Module({
  imports: [
    BullModule.registerQueue({ name: executorQueueName }),
    BullModule.registerQueue({ name: periodicQueueName }),
    TasksModule,
  ],
  providers: [ExecutorConsumer, ExecutorService, PeriodicConsumer],
  exports: [ExecutorService],
})
export class ExecutorModule {}
