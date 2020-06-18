import { SessionService } from '../session/session.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private session: SessionService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    this.session.logout();
                    location.reload(true);
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            }))
    }
}