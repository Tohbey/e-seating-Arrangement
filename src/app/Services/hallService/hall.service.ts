import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Hall } from 'src/app/models/hall';
import { retry, catchError } from 'rxjs/operators';
import { ExamSeat } from 'src/app/models/examSeat';
import { Student } from 'src/app/models/student';
import { ExamSession } from 'src/app/models/examSession';
import { APIs } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  private hallUrl = APIs.hallUrl;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  //get all halls
  getAllHall():Observable<Hall>{
    return this.http.get<Hall>(this.hallUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get hall by id
  getHallById(id):Observable<Hall>{
    return this.http.get<Hall>(this.hallUrl+"/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get all hall names
  getAllHallNames():Observable<String[]>{
    return this.http.get<String[]>(this.hallUrl +"/hallNames")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get hall by hallName
  getHallByHallName(hallName):Observable<Hall>{
    return this.http.get<Hall>(this.hallUrl+"/name/"+hallName)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

    //deleting hall
    deleteHallById(id){
      return this.http.delete<Hall>(this.hallUrl +"/"+id,this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }


    //creating a new hall
    createHall(hall):Observable<Hall>{
      return this.http.post<Hall>(this.hallUrl,hall,this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //Updating hall
    updateHall(id,hall):Observable<Hall>{
      return this.http.put<Hall>(this.hallUrl+"/"+id,hall,this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //generate seats
    generateExamSessions(hallName, mode):Observable<ExamSession>{
        return this.http.get<ExamSession>(this.hallUrl+"/generateSessions/"+hallName+"-"+mode)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    //get exam sessions
    getExamSessions(hallName,sessionType):Observable<ExamSession>{
      return this.http.get<ExamSession>(this.hallUrl+"/getSessions/"+hallName+"-"+sessionType)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }


    //fetch student details
    fetchStudent(hallName,sessionType):Observable<Student>{
      return this.http.get<Student>(this.hallUrl+"/generateStudent/"+hallName+"/"+sessionType)
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
