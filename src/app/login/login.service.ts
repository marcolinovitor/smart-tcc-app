import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../shared/session/session.service';
import { env } from 'src/environments/env';
import { Observable } from 'rxjs';
import { LoginUser } from './model/login-user.interface';
import { map, tap } from 'rxjs/operators';
import { ClienteResponse } from '../shared/models/cliente.response';

export interface Usuario {
    email: string;
    senha: string;
}

@Injectable()
export class LoginService {

    constructor(
        private readonly http: HttpClient,
        private readonly route: Router,
        private readonly session: SessionService,
        // private readonly clienteService: Cliente
    ) { }

    login(user: Usuario): Observable<boolean> {
        return this.http.post<LoginUser>(`${env.api}/autenticar`, user)
            .pipe(
                map((usuario: LoginUser) => {
                    if (usuario) {
                        this.session.saveOnSession(usuario);
                        return true;
                    }
                }),
                tap(() => this.getClienteAndSave(user.email)),
            );
            
    }

    private getClienteAndSave(email: string): void {
        this.http.get<ClienteResponse>(`${env.api}/cliente/GetByEmail/${email}`)
            .subscribe(result => {
                this.session.saveClientOnSession(result);
            }, () => {
                
            }, () => {
                this.route.navigate(['home']);
            });
    }
}
