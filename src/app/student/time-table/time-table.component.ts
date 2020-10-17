import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';
import { ExamCourses } from 'src/app/models/ExamCourses';
import { Student } from 'src/app/models/student';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { DayService } from 'src/app/Services/dayService/day.service';
import { StudentService } from 'src/app/Services/studentService/student.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  student:Student;
  studentExamCourse:ExamCourses;
  day:Day;
  constructor(
    private studentService:StudentService,
    private BasicAuth:BasicAuthenticationService,
    private DayService:DayService
  ) { }

  ngOnInit(): void {
    this.getStudentDetails()
    this.getCurrentDay()
  }

  getCurrentDay(){
    let resp = this.DayService.getCurrentDay();
    resp.subscribe((data) => {
      this.day = data
      console.log(this.day)
    })
    return this.day;
  }

  getStudentDetails(){
    let matricNumber = this.BasicAuth.getAuthenticatedUser();
    let resp = this.studentService.getStudentByMatricNumber(matricNumber);
    resp.subscribe((data) => {
      this.student = data
      this.getExamCourses(this.student);
    })
    return this.student;
  }

  getExamCourses(student:Student){
    let resp = this.studentService.getExamCourses(student.id);
    resp.subscribe((data) => {
      this.studentExamCourse = data;
      console.log(this.studentExamCourse)
    })
    return this.studentExamCourse;
  }

}
