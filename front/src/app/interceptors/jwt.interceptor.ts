import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  let router = new Router() 
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    router.navigate(['/'])
  }

  return next(req);
};
