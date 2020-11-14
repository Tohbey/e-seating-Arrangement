import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Student } from 'src/app/models/student';
import { retry, catchError } from 'rxjs/operators';
import { ExamCourses } from 'src/app/models/ExamCourses';
import { ExamSeat } from 'src/app/models/examSeat';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentUrl = 'http://localhost:8080/student';

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  //get all student
  getAllStudent():Observable<Student>{
    return this.http.get<Student>(this.studentUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get student by id
  getStudentById(id):Observable<Student>{
    return this.http.get<Student>(this.studentUrl+"/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get Student by matricNumber
  getStudentByMatricNumber(matricNumber):Observable<Student>{
    return this.http.get<Student>(this.studentUrl+"/byMatric/"+matricNumber)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //delete student
  deleteStudentById(id){
    return this.http.delete<Student>(this.studentUrl+"/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //update Student
  updateStudent(id,student:Student):Observable<Student>{
    return this.http.put<Student>(this.studentUrl+"/"+id,JSON.stringify(student),this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //create student
  createStudent(student:Student):Observable<Student>{
    return this.http.post<Student>(this.studentUrl,JSON.stringify(student),this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //get exam Courses
  getExamCourses(id):Observable<ExamCourses>{
    return this.http.get<ExamCourses>(this.studentUrl+"/getExamCourses/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //generate Seats
  generateStudentSeat(id):Observable<ExamSeat>{
    return this.http.get<ExamSeat>(this.studentUrl+"/generateSeats/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //getExamByDay
  getExamByDay(id):Observable<ExamCourses>{
    return this.http.get<ExamCourses>(this.studentUrl+"/getExamByDay/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Error Handling
  handleError(error:HttpErrorResponse){
    // let errorMessage="";
    // if(error.error instanceof ErrorEvent){
    //   //Get client-side error
    //   errorMessage = error.message;
    // }else{
    //   //get serve-side error
    //   errorMessage = 'Error Code: $(error.status)\n Message:$(error.error.message)'
    //   }
    console.log(error.error.message);
    window.alert(error.error.message)
    return throwError(error);
  }
}
