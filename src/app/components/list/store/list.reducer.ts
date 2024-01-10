import { Action, createReducer, on } from '@ngrx/store';

import { Task } from '../../../model/task.model';
import {
  addTask,
  addTaskSuccess,
  loadTaskSuccess,
  updateTasksSuccess,
} from './list.action';

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
  }),

  on(addTaskSuccess, (state, { newTask }) => {
    newTask.id = String(state.tasks.length + 1);
    return { ...state, newTask };
  })
);

export function tasksReducer(state: TaskState | undefined, action: Action) {
  return _tasksReducer(state, action);
}
