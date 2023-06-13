import { TaskPayload } from "../tasks/types";

export const CHECK_TASKS_TO_DO = "checkTasksToDo" as const;
export const HANDLE_TASK = "handleTask" as const;

type ExecutorJobType = typeof CHECK_TASKS_TO_DO | typeof HANDLE_TASK;

interface IExecutorJob {
  type: ExecutorJobType;
  payload: unknown;
}

export interface CheckToDoTasks extends IExecutorJob {
  type: "checkTasksToDo";
  payload: number;
}

export interface TaskToDo extends IExecutorJob {
  type: "handleTask";
  taskId: string;
  payload: TaskPayload;
}

export type ExecutorJob = CheckToDoTasks | TaskToDo;
