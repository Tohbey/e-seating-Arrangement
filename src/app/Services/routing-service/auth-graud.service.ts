import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BasicAuthenticationService } from '../authenticationService/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGraudService implements CanActivate{

  constructor(public auth:BasicAuthenticationService,
    public router:Router) { }

  canActivate():boolean{
    if(!this.auth.isUserLoggedIn()){
      this.router.navigate(['login']);
      return false
    }
    return true;
  }
}
