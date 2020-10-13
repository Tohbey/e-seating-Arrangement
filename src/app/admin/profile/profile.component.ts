import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { UsersService } from 'src/app/Services/userService/users.service';
import { MustMatch } from 'src/app/validator/mustMatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  admin:User
  //to change password
  passwordForm:FormGroup;
  //to change admin details
  adminForm:FormGroup;
  submitted = false;
  constructor(private adminService:UsersService,
    private BasicAuth:BasicAuthenticationService,
    private formBuilder:FormBuilder) {
    }


  ngOnInit(): void {
    this.getAdmin();
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
  hideErrors(){
    Object.keys(this.passwordForm.controls).forEach(key => {
      this.passwordForm.get(key).setErrors(null) ;
    })
}


  onSubmit(){
    this.submitted = true;
    if(this.passwordForm.invalid){
      return;
    }

  }

  getAdmin(){
    let email = this.BasicAuth.getAuthenticatedUser();
    let resp = this.adminService.getUserByEmail(email);
    resp.subscribe((data) => {
      this.admin = data;
      console.log(this.admin)
    })
    return this.admin;
  }
}
