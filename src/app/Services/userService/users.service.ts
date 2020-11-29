import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../../models/user';
import { retry, catchError } from 'rxjs/operators';
import { APIs } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userUrl = APIs.userUrl;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  //get all users
  getAllUser():Observable<User>{
    return this.http.get<User>(this.userUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get user by id
  getUserById(id):Observable<User>{
    return this.http.get<User>(this.userUrl +"/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  //get user by email
  getUserByEmail(email):Observable<User>{
    return this.http.get<User>(this.userUrl +"/email/"+email)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //deleting user
  deleteUserById(id){
    return this.http.delete<User>(this.userUrl +"/"+id,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  //creating a new user
  createUser(user:User):Observable<User>{
    return this.http.post<User>(this.userUrl,JSON.stringify(user),this.httpOptions)
  }

  //Updating user
  updateUser(id,user:User):Observable<User>{
    return this.http.put<User>(this.userUrl+"/"+id,JSON.stringify(user),this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

    //Updating user
  changePassword(id,user:User):Observable<User>{
    return this.http.put<User>(this.userUrl+"/updatePassword/"+id,JSON.stringify(user),this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Error Handling
  handleError(error){
    let errorMessage="";
    if(error.error instanceof ErrorEvent){
      //Get client-side error
      errorMessage = error.error.message;
    }else{
      //get serve-side error
      errorMessage = 'Error Code: $(error.status)\n Message:$(error.message)'
      }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
