import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './shared/session/session.service';

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(
        private sessionService: SessionService,
        private route: Router
    ) { }

    isLoggedIn() {
        const user = this.sessionService.getFromSession();
        const route = !!user ? 'home' : 'login';
        this.route.navigate([route]);
    }

}