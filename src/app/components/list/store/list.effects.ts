import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { TodoService } from '../../../service/todo.service';
import {
  addTask,
  addTaskSuccess,
  dummyAction,
  loadTaskFailure,
  loadTaskSuccess,
  loadTasks,
  updateTasks,
  updateTasksSuccess,
} from './list.action';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { getTasks } from './list.selector';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store
  ) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      withLatestFrom(this.store.select(getTasks)),
      mergeMap(([action, tasks]) => {
        if (!tasks.length || tasks.length === 1) {
          return this.todoService.getTask().pipe(
            map((tasks) => loadTaskSuccess({ tasks })),
            catchError((error) => of(loadTaskFailure({ error: error })))
          );
        }
        return of(dummyAction());
      })
    )
  );

  editTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTasks),
      switchMap(({ updatedTask }) => {
        return this.todoService
          .editTask(updatedTask)
          .pipe(map(() => updateTasksSuccess({ updatedTask })));
      })
    )
  );

  // addTask$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(addTask),
  //       switchMap(({ newTask }) =>{
  //         return this.todoService.addTask(newTask).pipe(
  //           map(() => addTaskSuccess())
  //         )
  //       })
  //     )
  // );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) =>
        this.todoService.addTask(action.newTask).pipe(
          map((taskData) => {
            const newTask = { ...action.newTask, id: taskData.id };
            return addTaskSuccess({ newTask });
          })
        )
      )
    )
  );
}
