import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Day } from 'src/app/models/day';
import { User } from 'src/app/models/user';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { UsersService } from 'src/app/Services/userService/users.service';
import { MustMatch } from 'src/app/validator/mustMatch';
import { DayService } from 'src/app/Services/dayService/day.service';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { Coordinators } from 'src/app/models/coordinators';
import { NotificationService } from 'src/app/Services/notification/notification.service';
import { faEyeSlash , faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  admin:User
  coordinator:Coordinators
  //to change password
  passwordForm:FormGroup;
  //to change admin details
  coordinatorForm:FormGroup;
  submitted = false;
  day:Day;
  fieldTextType:boolean;
  submittedCoordinator=false;
  submittedPassword = false;
  title="e-Seating Arrangemnt";
  notVisible = faEyeSlash;
  visible = faEye;

  constructor(private adminService:UsersService,
    private BasicAuth:BasicAuthenticationService,
    private formBuilder:FormBuilder,
    private DayService:DayService,
    private coordinatorService:CoordinatorService,
    private notifyService : NotificationService,) {}


  ngOnInit(): void {
    this.getCurrentDay()
    this.getAdminDetail();
    this.getCoordinatorDetail();
    this.passwordForm = this.formBuilder.group({
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    },{
      validator: MustMatch('password','confirmPassword')
    })
    this.coordinatorForm = this.formBuilder.group({
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
    return this.coordinatorForm.controls;
  }

  hideErrors(){
    Object.keys(this.passwordForm.controls).forEach(key => {
      this.passwordForm.get(key).setErrors(null) ;
    })
  }

toggleFieldTextType(){
  this.fieldTextType = !this.fieldTextType;
}


getCurrentDay(){
  let resp = this.DayService.getCurrentDay();
  resp.subscribe((data) => {
    this.day = data
    console.log(this.day)
  })
  return this.day;
}

  getAdminDetail(){
    let email = this.BasicAuth.getAuthenticatedUser();
    let resp = this.adminService.getUserByEmail(email);
    resp.subscribe((data) => {
      this.admin = data;
      console.log(this.admin)
    })
    return this.admin;
  }

  getCoordinatorDetail(){
    let email = this.BasicAuth.getAuthenticatedUser();
    let resp = this.coordinatorService.getCoordinatorByEmail(email)
    resp.subscribe((data) => {
      this.coordinator = data;
      console.log(this.coordinator)
    })
    return this.coordinator;
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
    this.submittedCoordinator = true;
    if(this.coordinatorForm.invalid){
      return;
    }
    console.log(this.coordinatorForm.value);
    this.admin.userSurname = this.coordinatorForm.get('userSurname').value;
    this.admin.userOtherName = this.coordinatorForm.get('userOtherName').value;
    this.admin.userEmail = this.coordinatorForm.get('userEmail').value;
    this.admin.userPhoneNumber = this.coordinatorForm.get('userPhoneNumber').value;
    this.admin.department = this.coordinatorForm.get('department').value;

    this.coordinator.coordinatorSurname = this.coordinatorForm.get('userSurname').value;
    this.coordinator.coordinatorOtherName = this.coordinatorForm.get('userOtherName').value;
    this.coordinator.coordinatorEmail = this.coordinatorForm.get('userEmail').value;
    this.coordinator.coordinatorPhoneNumber = this.coordinatorForm.get('userPhoneNumber').value;
    this.coordinator.coordinatorDepartment = this.coordinatorForm.get('department').value;

    console.log(this.coordinator)
    this.coordinatorService.updateCoordinator(this.coordinator.id,this.coordinator).subscribe((data) => {
      this.getCoordinatorDetail();
    })

    console.log(this.admin)
    this.adminService.updateUser(this.admin.id,this.admin).subscribe((data) => {
      this.notifyService.showSuccess("Info has been Updated Successfully",this.title)
    })
    this.coordinatorForm.reset();
    Object.keys(this.coordinatorForm.controls).forEach(key => {
      this.coordinatorForm.get(key).setErrors(null) ;
    });
    document.getElementById('coordinatorForm').style.display = "none"
  }

  changePassword(){
    document.getElementById('passwordForm').style.display = "block"
    document.getElementById('coordinatorForm').style.display = "none"
  }

  updateInfo(){
    const value = window.confirm('are you sure you want to update your details? ');
    console.log('Alert Response', value);
    if(value){
      document.getElementById('passwordForm').style.display = "none"
      document.getElementById('coordinatorForm').style.display = "block"
      this.coordinatorForm.patchValue(this.admin)
    }else{
      console.log('Response: ',value);
    }
  }
}
