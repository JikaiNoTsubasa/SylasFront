import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./AuthService";
import { Router } from "@angular/router";

export function provideBearerInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    let auth = inject(AuthService);
    let router = inject(Router);
    let token = localStorage.getItem('token');
    if (token && !req.url.includes('.well-known/openid-configuration')) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            auth.logout();
            router.navigate(['/login']);
          }
          return throwError(() => err);
        })
      );
}