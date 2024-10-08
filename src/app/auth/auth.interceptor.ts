import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

// Add this constant at the top of your file
const EXCLUDE_URLS = ['testetsttest'];

let isRefreshing = false;

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  // Check if the request URL should be excluded
  const shouldExclude = EXCLUDE_URLS.some((url) => req.url.includes(url));

  // If the URL should be excluded, pass the request through without modification
  if (shouldExclude) {
    return next(req);
  }

  // Clone the request object
  let newReq = req.clone();

  if (authService.accessToken) {
    newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + authService.accessToken
      ),
      withCredentials: true,
    });
  }

  // Response
  return next(newReq).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !isRefreshing
      ) {
        isRefreshing = true;
        return authService.refreshAccessToken().pipe(
          switchMap(() => {
            isRefreshing = false;
            newReq = req.clone({
              headers: req.headers.set(
                'Authorization',
                'Bearer ' + authService.accessToken
              ),
            });
            return next(newReq);
          }),
          catchError((error) => {
            isRefreshing = false;
            authService.signOut();
            location.reload();
            return throwError(error);
          })
        );
      }
      return throwError(error);
    })
  );
};
