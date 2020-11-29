import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationMessage } from '../../models/AuthenticationMessage';
import { map } from 'rxjs/operators';
import { APIs } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http:HttpClient) { }

  loginUrl= APIs.loginUrl;

  excuteBasicAuthentication(userEmail,password){
    let basicAuthentication = 'Basic ' + window.btoa(userEmail +':'+ password);

    let headers = new HttpHeaders({
      authorization: basicAuthentication
    })
    return this.http.get<AuthenticationMessage>(this.loginUrl,{headers}).pipe(
      map(
        data => {
          sessionStorage.setItem('AuthenticatedUser',userEmail)
          sessionStorage.setItem('token',basicAuthentication)
          return data;
        }
      )
    )
  }
  getAuthenticatedUser(){
    return sessionStorage.getItem('AuthenticatedUser');
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser){
      return sessionStorage.getItem('token');
    }
  }
  logout(){
    sessionStorage.removeItem('AuthenticatedUser')
    sessionStorage.removeItem('token')
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('AuthenticatedUser')
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem('AuthenticatedUser')
    if (user === null) return ''
    return user
  }
}
