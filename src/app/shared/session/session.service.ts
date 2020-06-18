import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/login/model/login-user.interface';


@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(private route: Router) { }

    //   saveClientOnSession(cliente: ClienteResponse) {
    saveClientOnSession(cliente) {
        const cli = this.encrypt(cliente);
        sessionStorage.setItem('cliente', cli);
    }

    //   getClienteFromSession(): ClienteResponse {
    getClienteFromSession() {
        const cliente = sessionStorage.getItem('cliente');
        return cliente ? this.decrypt(cliente) : undefined;
    }

    saveOnSession(user: LoginUser) {
        const u = this.encrypt(user);
        sessionStorage.setItem('user', u);
    }

    getFromSession(): LoginUser {
        const u = sessionStorage.getItem('user');

        return u ? this.decrypt(u) : undefined;
    }

    logout(route?: string) {
        sessionStorage.setItem('user', null);
        sessionStorage.setItem('cliente', null);
        sessionStorage.clear();
        this.route.navigate([route]);
    }

    decrypt(obj) {
        const decrypted = atob(obj);
        return JSON.parse(decrypted);
    }

    encrypt(obj) {
        const json = JSON.stringify(obj);
        return btoa(json);
    }

}
