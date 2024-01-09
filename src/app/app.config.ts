import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StoreModule, provideStore } from '@ngrx/store';
import {
  StoreDevtoolsModule,
  provideStoreDevtools,
} from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { EffectsModule } from '@ngrx/effects';
import { tasksReducer } from './components/list/store/list.reducer';
import { TASK_STATE_NAME } from './components/list/store/list.selector';
import { TaskEffects } from './components/list/store/list.effects';

export const appReducer = {
  [TASK_STATE_NAME]: tasksReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),

    importProvidersFrom(
      // configure NgRx modules
      StoreModule.forRoot(appReducer),
      StoreDevtoolsModule.instrument(),
      EffectsModule.forRoot([TaskEffects])
    ),
  ],
};
