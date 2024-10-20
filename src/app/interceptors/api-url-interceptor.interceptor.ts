import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api.config';

// export const apiUrlInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

export function apiUrlInterceptorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {

  const apiConfig = inject(API_CONFIG);

  const newReq = req.clone({
    url: `${apiConfig.url}/${req.url}`,
  });
  return next(newReq);

}

