import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { UsersService } from 'src/app/Services/userService/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  lecturer: FormGroup;
  student:FormGroup;
  message: any;
  user: User = new User();
  role;
  invalidLogin: boolean;
  errorMessage = 'Invalid Credentials';

  constructor(
    private http: HttpClient,
    private router: Router, private formBuilder: FormBuilder,
    private basicAuthentication: BasicAuthenticationService,
    private userService: UsersService) {
    this.lecturerForm();
    this.studentForm();
  }

  ngOnInit(): void {}

  lecturerForm() {
    this.lecturer = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  studentForm(){
    this.student = this.formBuilder.group({
      matricNumber:['',Validators.required],
      password:['',Validators.required]
    })
  }

  get f() {
    return this.lecturer.controls;
  }
  get g() {
    return this.student.controls;
  }

  asLecturer(){
    document.getElementById('lecturer').style.display = 'block'
    document.getElementById('student').style.display = 'none'
  }

  asStudent(){
    document.getElementById('lecturer').style.display = 'none'
    document.getElementById('student').style.display = 'block'
  }

  studentLogin(){
    this.submitted = true;
    if (this.student.invalid) {
      return;
    }
    console.log(this.student.value);
    const username = this.student.get('matricNumber').value;
    const password = this.student.get('password').value;
    this.basicAuthentication.excuteBasicAuthentication(username, password).subscribe(
      data => {
        console.log(data);
        this.invalidLogin = false;
        this.userService.getUserByEmail(username).subscribe((resp) => {
          this.user = resp;
          this.role = this.user.roles[0].role;
          console.log(this.role);
          if (this.role === 'Student') {
            this.router.navigate(['../student']);
          } else {
            this.submitted = false;
          }
        });
      }, error => {
        console.log(error);
        this.invalidLogin = true;
      }
    );
  }

  lecturerLogin() {
    this.submitted = true;
    if (this.lecturer.invalid) {
      return;
    }
    console.log(this.lecturer.value);
    const username = this.lecturer.get('email').value;
    const password = this.lecturer.get('password').value;
    this.basicAuthentication.excuteBasicAuthentication(username, password).subscribe(
      data => {
        console.log(data);
        this.invalidLogin = false;
        this.userService.getUserByEmail(username).subscribe((resp) => {
          this.user = resp;
          this.role = this.user.roles[0].role;
          console.log(this.role);
          if (this.role === 'Admin') {
            this.router.navigate(['../admin']);
          } else if(this.role === 'Coordinator'){
            this.router.navigate(['../coordinator']);
          }else{
            this.submitted = false;
          }
        });
      }, error => {
        console.log(error);
        this.invalidLogin = true;
      }
    );
  }
}