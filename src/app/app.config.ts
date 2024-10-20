import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  API_CONFIG,
  DEFAULT_API_CONFIG,
} from './api.config';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { apiUrlInterceptorInterceptor } from './interceptors/api-url-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: API_CONFIG,
      useValue: DEFAULT_API_CONFIG,
    },
    provideHttpClient(
      withFetch(),
      withInterceptors([apiUrlInterceptorInterceptor]),
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
