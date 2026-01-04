import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export const authInterceptor: HttpInterceptorFn =(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> =>{

  if (req.url.includes('/api/auth')){
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.getToken();
  const userId = authService.getUserId();

  if (!token || userId == null){
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,'X-USER-ID': userId.toString(),
    },
  });

  return next(authReq);
};
