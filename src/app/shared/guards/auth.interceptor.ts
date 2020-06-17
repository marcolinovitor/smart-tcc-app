import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private session: SessionService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {      
        const urlNext = request.url.startsWith('https://parallelum') || request.url.endsWith('/api/autenticar');
        if (urlNext) {
            return next.handle(request);
        } else {
            const token = this.session.getFromSession().token;
            if (token) {
                request = request.clone({
                    headers: request.headers.set(
                        'Authorization', `Bearer ${token}`
                    )
                })
            }
            return next.handle(request);
        }       
    }
}