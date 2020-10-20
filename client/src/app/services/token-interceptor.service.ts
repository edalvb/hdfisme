import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenizeRe = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    return next.handle(tokenizeRe).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/acceso');
        }
        console.log(err);
        this._snackBar.open(err.error.mensaje, "Error", {
          duration: 2000,
        });
        return throwError( err );

      })
    );
  }
}
