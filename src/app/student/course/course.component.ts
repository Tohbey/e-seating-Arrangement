import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { StudentService } from 'src/app/Services/studentService/student.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  student:Student;
  studentCourses:Courses[];
  constructor(private studentService:StudentService,
    private BasicAuth:BasicAuthenticationService) { }

  ngOnInit(): void {
    this.getStudentByMatricNumber();
  }

  getStudentByMatricNumber(){
    let matricNumber = this.BasicAuth.getAuthenticatedUser();
    let resp = this.studentService.getStudentByMatricNumber(matricNumber);
    resp.subscribe((data) => {
      this.student = data
      this.studentCourses = this.student.courses;
      console.log(this.studentCourses)
    })
    return this.student;
  }
}
