import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../shared/session/session.service';
import { env } from 'src/environments/env';
import { Observable } from 'rxjs';
import { LoginUser } from './model/login-user.interface';
import { map, tap } from 'rxjs/operators';

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
    ) { }

    login(user: Usuario): Observable<boolean> {
        let isMecanico = false;
        return this.http.post<LoginUser>(`${env.api}/autenticar`, user)
            .pipe(
                map((usuario: LoginUser) => {
                    if (usuario) {
                        isMecanico = usuario.authenticatedRole === 'Mecanico';
                        this.session.saveOnSession(usuario);
                        return true;
                    }
                }),
                tap(() => {
                    // if (!isMecanico) {
                    //     this.getClienteAndSave(user.email, isMecanico)
                    // } else {
                    this.route.navigate(['home']);
                    // }
                }),
            );
    }

    // private getClienteAndSave(email: string, isMecanico: boolean): void {
    //     this.clienteService.getClienteByEmail(email)
    //         .subscribe(result => {
    //             this.session.saveClientOnSession(result);
    //         }, () => {
    //             //
    //         }, () => {
    //             this.route.navigate([`admin${isMecanico ? '/dashboard' : '/orcamentos'}`]);
    //         });
    // }
}
