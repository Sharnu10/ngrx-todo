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

  on(loadTaskSuccess, (state, { tasks }) => ({ ...state.tasks, tasks })),

  on(updateTasksSuccess, (state, { updatedTask }) => {
    // const editedTask = state.tasks.map((task: Task) =>
    //   task.id === updatedTask.id ? updatedTask : task
    // );
    // return { ...state.tasks, tasks: editedTask };

    const taskIndex = state.tasks.findIndex(
      (task) => task.id === updatedTask.id
    );

    if (taskIndex !== -1) {
      const editedTask = [
        ...state.tasks.slice(0, taskIndex),
        updatedTask,
        ...state.tasks.slice(taskIndex + 1),
      ];
      return { ...state, tasks: editedTask };
    }

    return state;
  }),

  on(addTaskSuccess, (state, { newTask }) => {
    const updatedTask = [...state.tasks, newTask];
    return { ...state.tasks, tasks: updatedTask };
  })
);

export function tasksReducer(state: TaskState | undefined, action: Action) {
  return _tasksReducer(state, action);
}
