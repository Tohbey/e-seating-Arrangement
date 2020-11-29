import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Timetable } from 'src/app/models/timetable';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { APIs } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private timetableUrl = APIs.timeTableUrl;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  //get all timetables
  getAllTimetable():Observable<Timetable>{
    return this.http.get<Timetable>(this.timetableUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get timetable by id
  getTimetableById(id):Observable<Timetable>{
    return this.http.get<Timetable>(this.timetableUrl+"/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


    //deleting timetable
    deleteTimetableById(id){
      return this.http.delete<Timetable>(this.timetableUrl +"/"+id,this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }


    //creating a new timetable
    createTimetable(timetable:Timetable):Observable<Timetable>{
      return this.http.post<Timetable>(this.timetableUrl,JSON.stringify(timetable),this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //Updating timetable
    updateTimetable(id,timetable:Timetable):Observable<Timetable>{
      return this.http.put<Timetable>(this.timetableUrl+"/"+id,JSON.stringify(timetable),this.httpOptions)
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
  };
}
