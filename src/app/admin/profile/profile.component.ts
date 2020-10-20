import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Day } from 'src/app/models/day';
import { User } from 'src/app/models/user';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { UsersService } from 'src/app/Services/userService/users.service';
import { MustMatch } from 'src/app/validator/mustMatch';
import { DayService } from 'src/app/Services/dayService/day.service';
import { NotificationService } from 'src/app/Services/notification/notification.service';
import { faEyeSlash , faEye} from '@fortawesome/free-solid-svg-icons';

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
  submittedPassword = false;
  submittedAdmin = false;
  notVisible = faEyeSlash;
  visible = faEye;
  day:Day;
  fieldTextType:boolean;
  title="e-Seating Arrangemnt";
  constructor(private adminService:UsersService,
    private BasicAuth:BasicAuthenticationService,
    private formBuilder:FormBuilder,private notifyService : NotificationService,
    private DayService:DayService) {
    }


  ngOnInit(): void {
    this.getCurrentDay()
    this.getAdmin();
    this.passwordForm = this.formBuilder.group({
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    },{
      validator: MustMatch('password','confirmPassword')
    })
    this.adminForm = this.formBuilder.group({
      userSurname: ['',Validators.required],
      userOtherName: ['',Validators.required],
      userEmail: ['',Validators.required],
      userPhoneNumber: ['',Validators.required],
      department: ['',Validators.required],
    })
  }

  get f(){
    return this.passwordForm.controls;
  }

  get g(){
    return this.adminForm.controls;
  }

  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
  }


  hideErrors(){
    Object.keys(this.passwordForm.controls).forEach(key => {
      this.passwordForm.get(key).setErrors(null) ;
    })
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
    this.admin.userPassword = this.passwordForm.get('password').value;
    console.log(this.admin)
    this.adminService.changePassword(this.admin.id,this.admin).subscribe((data) => {
      this.notifyService.showSuccess("Password has been Updated Successfully",this.title)
    })
    document.getElementById('passwordForm').style.display = "none"

  }

  onUpdate(){
    this.submittedAdmin = true;
    if(this.adminForm.invalid){
      return;
    }
    console.log(this.adminForm.value);
    this.admin.userSurname = this.adminForm.get('userSurname').value;
    this.admin.userOtherName = this.adminForm.get('userOtherName').value;
    this.admin.userEmail = this.adminForm.get('userEmail').value;
    this.admin.userPhoneNumber = this.adminForm.get('userPhoneNumber').value;
    this.admin.department = this.adminForm.get('department').value;

    console.log(this.admin)
    this.adminService.updateUser(this.admin.id,this.admin).subscribe((data) => {
      this.notifyService.showSuccess("Info has been Updated Successfully",this.title)
    })
    this.adminForm.reset();
    Object.keys(this.adminForm.controls).forEach(key => {
      this.adminForm.get(key).setErrors(null) ;
    });
    document.getElementById('adminform').style.display = "none"
  }

  changePassword(){
    document.getElementById('passwordForm').style.display = "block"
    document.getElementById('adminform').style.display = "none"
  }

  updateInfo(){
    const value = window.confirm('are you sure you want to update your details? ');
    console.log('Alert Response', value);
    if(value){
      document.getElementById('passwordForm').style.display = "none"
      document.getElementById('adminform').style.display = "block"
      this.adminForm.patchValue(this.admin)
    }else{
      console.log('Response: ',value);
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

  onVisible(){
    var x = document.getElementById("password");
  }

  NotVisible(){

  }
}
