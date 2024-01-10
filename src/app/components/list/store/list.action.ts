import { createAction, props } from '@ngrx/store';
import { Task } from '../../../model/task.model';

const LOAD_TASK_ACTION = '[list page] load tasks';
const LOAD_TASK_SUCCESS = '[list page] load tasks success';
const LOAD_TASK_FAILURE = '[list page] load tasks success';
const UPDATE_TASK_ACTION = '[list page] edit task';
const UPDATE_TASK_SUCCESS = '[list page] edit task success';
const ADD_TASK_ACTION = '[list page] add task';
const ADD_TASK_SUCCESS = '[list page] add task success';

export const loadTasks = createAction(LOAD_TASK_ACTION);

export const loadTaskSuccess = createAction(
  LOAD_TASK_SUCCESS,
  props<{ tasks: Task[] }>()
);

export const loadTaskFailure = createAction(
  LOAD_TASK_FAILURE,
  props<{ error: string }>()
);

export const updateTasks = createAction(
  UPDATE_TASK_ACTION,
  props<{ updatedTask: Task }>()
);

export const updateTasksSuccess = createAction(
  UPDATE_TASK_SUCCESS,
  props<{ updatedTask: Task }>()
);

export const addTask = createAction(
  ADD_TASK_ACTION,
  props<{ newTask: Task }>()
);

export const addTaskSuccess = createAction(
  ADD_TASK_SUCCESS,
  props<{ newTask: Task }>()
);

export const dummyAction = createAction('[dummy action]');
