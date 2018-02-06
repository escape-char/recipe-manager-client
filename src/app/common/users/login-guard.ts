import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {SessionService } from './session.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private sessionService: SessionService,
              private router:Router) {}

  canActivate() {
    let ok:boolean = this.sessionService.isLoggedIn();
    if(!ok){
      this.router.navigateByUrl('/signin');
    }
    return ok;
  }
}
