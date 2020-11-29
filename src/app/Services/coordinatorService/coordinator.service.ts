import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http'
import { Observable,throwError, pipe } from 'rxjs';
import { Coordinators } from '../../models/coordinators';
import { retry, catchError } from 'rxjs/operators';
import { APIs } from '../APIs/apis';


@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {

  private coordinatorUrl = APIs.coordinatorUrl;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
   }

   //get All coordinators
  getAllCoordinators():Observable<Coordinators>{
    return this.http.get<Coordinators>(this.coordinatorUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get coordinator by id
  getCoordinatorById(id):Observable<Coordinators>{
    return this.http.get<Coordinators>(this.coordinatorUrl+'/'+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get all coordintators email
  getCoordinatorsEmail():Observable<String[]>{
    return this.http.get<String[]>(this.coordinatorUrl +"/emails")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get coordintator by email
  getCoordinatorByEmail(coordinatorEmail):Observable<Coordinators>{
    return this.http.get<Coordinators>(this.coordinatorUrl +"/email/"+coordinatorEmail)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get all coordintators Name
  getCoordinatorsName():Observable<String[]>{
    return this.http.get<String[]>(this.coordinatorUrl +"/coordinatorName")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCoordinatorSize():Observable<number>{
    return this.http.get<number>(this.coordinatorUrl +"/size")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //deleting coordinator
  deleteCoordinator(id){
    return this.http.delete<Coordinators>(this.coordinatorUrl+'/'+id,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //creating a new coordinator
  createCoordinator(coordinator:Coordinators):Observable<Coordinators>{
    return this.http.post<Coordinators>(this.coordinatorUrl,coordinator,this.httpOptions)
  }

  updateCoordinator(id,coordinator):Observable<Coordinators>{
    return this.http.put<Coordinators>(this.coordinatorUrl+'/'+id,coordinator,this.httpOptions)
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
        window.alert(errorMessage);
        return throwError(errorMessage);
  }
}
