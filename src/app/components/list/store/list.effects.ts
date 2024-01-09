import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { TodoService } from '../../../service/todo.service';
import {
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
    private action$: Actions,
    private todoService: TodoService,
    private store: Store
  ) {}

  loadTasks$ = createEffect(() =>
    this.action$.pipe(
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
    this.action$.pipe(
      ofType(updateTasks),
      switchMap(({ updatedTask }) => {
        return this.todoService
          .editTask(updatedTask)
          .pipe(map(() => updateTasksSuccess({ updatedTask })));
      })
    )
  );
}
