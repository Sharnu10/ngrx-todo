import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './list.reducer';

export const TASK_STATE_NAME = 'tasks';

export const selectTaskState =
  createFeatureSelector<TaskState>(TASK_STATE_NAME);

export const getTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);
