import { Action, createReducer, on } from '@ngrx/store';

import { Task } from '../../../model/task.model';
import { loadTaskSuccess, updateTasksSuccess } from './list.action';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const _tasksReducer = createReducer(
  initialState,

  on(loadTaskSuccess, (state, { tasks }) => ({ ...state, tasks })),

  on(updateTasksSuccess, (state, { updatedTask }) => {
    const editedTask = state.tasks.map((task: Task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    return { ...state, tasks: editedTask };
  })
);

export function tasksReducer(state: TaskState | undefined, action: Action) {
  return _tasksReducer(state, action);
}
