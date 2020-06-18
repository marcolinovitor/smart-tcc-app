import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss']
})

export class MenuPage implements OnChanges {

    @Input() idPage: string;
    menu = [];
    clienteNome = '';

    constructor(
        private readonly session: SessionService
    ) {
        this.menu = this.createMenu();
        this.clienteNome = this.getCliente().nome.split(' ')[0];
    }

    ngOnChanges(changes) {
        console.log(changes);
        
    }

    logout() {
        this.session.logout('login');
    }

    private getCliente() {
        return this.session.getClienteFromSession();
    }

    private createMenu() {
        return [
            { label: 'Home', icon: 'home-outline', path: '/home' },
            { label: 'Meus veículos', icon: 'car-sport-outline', path: '/veiculos' },
            { label: 'Solicitação', icon: 'chatbubbles-outline', path: '/solicitacoes' },
        ];
    }
}