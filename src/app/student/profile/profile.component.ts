import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';
import { Student } from 'src/app/models/student';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { StudentService } from 'src/app/Services/studentService/student.service';
import { DayService } from 'src/app/Services/dayService/day.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { MustMatch } from 'src/app/validator/mustMatch';
import { NotificationService } from 'src/app/Services/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  day:Day;
  studentDetail:Student;
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

  onSubmit(){
    this.submittedPassword = true;
    if(this.passwordForm.invalid){
      return;
    }
    console.log(this.passwordForm.get('password').value);
    this.studentDetail.password = this.passwordForm.get('password').value
    console.log(this.studentDetail)
    this.studentService.updateStudent(this.studentDetail.id,this.studentDetail).subscribe((data) => {
      this.notifyService.showSuccess("Password has been Updated Successfully",this.title)
    })
    document.getElementById('passwordForm').style.display = "none"
  }
}
