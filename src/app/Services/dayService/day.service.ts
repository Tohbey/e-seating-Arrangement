import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Day } from 'src/app/models/day';

@Injectable({
  providedIn: 'root'
})
export class DayService{

  private dayUrl = 'http://localhost:8080/days';

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  getCurrentDay():Observable<Day>{
    return this.http.get<Day>(this.dayUrl)
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
      errorMessage = 'Error Code: $(error.status)\n Message:$(error.error.message)'
      }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
