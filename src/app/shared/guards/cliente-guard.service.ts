import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteGuardService implements CanActivate, CanLoad {

  constructor(
    private sessionService: SessionService,
    private route: Router
  ) { }

  canActivate(): boolean {
    const user = this.sessionService.getFromSession();      
    if (user && user.authenticatedRole === 'Cliente') {     
      return true;
    } else if (user) {
      this.route.navigate(['/home'])
      return false;
    } else {
      this.route.navigate(['/login'])
      return false;
    }
  }

  canLoad(): boolean {
    const user = this.sessionService.getFromSession();
    if (user && user.authenticatedRole === 'Cliente') {
      return true;
    }

    return false;
  }
}



