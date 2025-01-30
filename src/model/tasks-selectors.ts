import { TasksState } from "../app/App";
import { RootState } from "../app/store";

export const selestTasks = (state: RootState): TasksState => state.tasks;
