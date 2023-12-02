import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokenData } from '../model/token-model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLogged = AuthService.isloged;
        if (!isLogged) return next.handle(request);
        const token = AuthService.token;

        if (token) {
            const modifiedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return next.handle(modifiedRequest);
        } else {
            return next.handle(request);
        }
    }
}
