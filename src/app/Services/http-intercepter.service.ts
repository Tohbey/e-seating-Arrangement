import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from './authenticationService/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor{

  constructor(private basicAuthentication:BasicAuthenticationService) { }

  intercept(request:HttpRequest<any>,next:HttpHandler){
    let basicAuthHeader = this.basicAuthentication.getAuthenticatedToken();
    let username = this.basicAuthentication.getAuthenticatedUser();
    if(basicAuthHeader && username){
      request = request.clone({
        setHeaders:{
          Authorization:basicAuthHeader
        }
      })
    }
    return next.handle(request);
  }
}
