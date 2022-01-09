import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { NotificationService } from 'src/app/Services/notification/notification.service';
import { StudentService } from 'src/app/Services/studentService/student.service';
import { DayService } from 'src/app/Services/dayService/day.service';
import { Student } from 'src/app/models/student';
import { ExamCourses } from 'src/app/models/ExamCourses';
import { ExamSeat } from 'src/app/models/examSeat';
import { Courses } from 'src/app/models/course';
import { CourseService } from 'src/app/Services/courseService/course.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {

  day:Day;
  studentDetail:Student;
  course:Courses;
  studentExamCourses:ExamCourses;
  examSeat:ExamSeat;
  examSession:String;
  title="e-Seating Arrangment"
  constructor(
    private DayService:DayService,
    private BasicAuth:BasicAuthenticationService,
    private studentService:StudentService,
    private notifyService : NotificationService,
    private courseService:CourseService,
  ) { }

  ngOnInit(): void {
    this.getCurrentDay();
    this.getStudent();
  }

  getStudent(){
    let student = this.BasicAuth.getAuthenticatedUser();
    console.log(student)
    let resp = this.studentService.getStudentByMatricNumber(student)
    resp.subscribe((data) => {
      this.studentDetail = data;
      this.getExamCourseByDay(this.studentDetail.id);
      console.log(this.studentDetail)
    })
    return this.studentDetail;
  }

  getCurrentDay(){
    let resp = this.DayService.getCurrentDay();
    resp.subscribe((data) => {
      this.day = data
      console.log(this.day)
    })
    return this.day;
  }

  getExamCourseByDay(id){
    let resp = this.studentService.getExamByDay(id)
    resp.subscribe((data) => {
      this.studentExamCourses = data;
      console.log(this.studentExamCourses)
      this.getExamSession(this.studentExamCourses.examTime)
      this.getExamCourseDetail(this.studentExamCourses.courseCode)
    })
    return this.studentExamCourses;
  }

  getExamSession(time){
    switch(time){
      case '9am-12noon':
      this.examSession="Morning Session";
      break;
      case '12noon-3pm':
        this.examSession= "Afternoon Session";
        break;
      default:
        this.examSession = "Evening Session"
    }
  }

  getExamCourseDetail(courseCode){
    let resp = this.courseService.getCourseByCourseCode(courseCode)
    resp.subscribe((data) => {
      this.course = data
      console.log(this.course)
    })
  }

  generateSeat(){
    let resp = this.studentService.generateStudentSeat(this.studentDetail.id)
    resp.subscribe((data) => {
      this.examSeat = data;
      this.notifyService.showSuccess("Seat generated successfully",this.title)
      console.log(this.examSeat)
      this.getStudent()
    })
    document.getElementById('exam-pass').style.display = 'block';
    return this.studentExamCourses;
  }
}
