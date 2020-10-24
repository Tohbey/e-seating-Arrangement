import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ExamCourses } from 'src/app/models/ExamCourses';
import { catchError, retry } from 'rxjs/operators';
import { Courses } from 'src/app/models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private coursesUrl = 'http://localhost:8080/ExamCourses';
  private mainCourseUrl = 'http://localhost:8080/courses';

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

    //get all COurses
    getAllCourses():Observable<ExamCourses>{
      return this.http.get<ExamCourses>(this.coursesUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //get Course by id
    getCourseById(id):Observable<ExamCourses>{
      return this.http.get<ExamCourses>(this.coursesUrl+"/"+id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //get exam days
    getExamdates(week):Observable<String[]>{
      return this.http.get<String[]>(this.coursesUrl+"/examDatesByWeek/"+week)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //get courses by examDay and time
    getCOursesByExamTime(examDay,examTime):Observable<ExamCourses[]>{
      return this.http.get<ExamCourses[]>(this.coursesUrl +"/"+examDay+"/"+examTime)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    getExamWeek():Observable<String[]>{
      return this.http.get<String[]>(this.coursesUrl +'/getWeek')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //get courses by exam day
    getCoursesByExamday(examday):Observable<ExamCourses>{
      return this.http.get<ExamCourses>(this.coursesUrl+"/exam/"+examday)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //get courses by course code
    getCourseByCourseCode(courseCode):Observable<Courses>{
      return this.http.get<Courses>(this.mainCourseUrl+"/courseCode/"+courseCode)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }


    //deleting course
    deleteHallById(id){
      return this.http.delete<ExamCourses>(this.coursesUrl +"/"+id,this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }


    //creating a new course
    createHall(course:ExamCourses):Observable<ExamCourses>{
      return this.http.post<ExamCourses>(this.coursesUrl,JSON.stringify(course),this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //Updating coourse
    updateHall(id,course:ExamCourses):Observable<ExamCourses>{
      return this.http.put<ExamCourses>(this.coursesUrl+"/"+id,JSON.stringify(course),this.httpOptions)
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
