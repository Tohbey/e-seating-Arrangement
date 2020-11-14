import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';
import { Student } from 'src/app/models/student';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { StudentService } from 'src/app/Services/studentService/student.service';
import { UsersService } from 'src/app/Services/userService/users.service';
import { DayService } from 'src/app/Services/dayService/day.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { MustMatch } from 'src/app/validator/mustMatch';
import { NotificationService } from 'src/app/Services/notification/notification.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  day:Day;
  studentDetail:Student;
  studentUser:User;
  submittedPassword = false;
  title="e-Seating Arrangemnt";
  notVisible = faEyeSlash;
  visible = faEye;
  //to change password
  passwordForm:FormGroup;
  fieldTextType:boolean;
  constructor(
    private formBuilder:FormBuilder,
    private DayService:DayService,
    private BasicAuth:BasicAuthenticationService,
    private studentService:StudentService,
    private notifyService : NotificationService,
    private userService:UsersService
  ) { }

  ngOnInit(): void {
    this.getStudent();
    this.getCurrentDay();
    this.passwordForm = this.formBuilder.group({
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    },{
      validator: MustMatch('password','confirmPassword')
    })
  }

  get f(){
    return this.passwordForm.controls;
  }

  changePassword(){
    document.getElementById('passwordForm').style.display = "block"
  }

  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
  }

  getStudent(){
    let student = this.BasicAuth.getAuthenticatedUser();
    console.log(student)
    let resp = this.studentService.getStudentByMatricNumber(student)
    resp.subscribe((data) => {
      this.studentDetail = data;
      console.log("Student Details",this.studentDetail)
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

  getStudentUser(){
    let email = this.BasicAuth.getAuthenticatedUser();
    let resp = this.userService.getUserByEmail(email);
    resp.subscribe((data) => {
      this.studentUser = data;
      console.log("Student-user details",this.studentUser)
    })
  }

  onSubmit(){
    this.submittedPassword = true;
    if(this.passwordForm.invalid){
      return;
    }
    console.log(this.passwordForm.get('password').value);
    this.studentUser.userPassword = this.passwordForm.get('password').value
    console.log(this.studentDetail)
    this.userService.changePassword(this.studentUser.id,this.studentUser).subscribe((data) => {
      this.notifyService.showSuccess("Password has been Updated Successfully",this.title)
    })
    document.getElementById('passwordForm').style.display = "none"
  }
}
