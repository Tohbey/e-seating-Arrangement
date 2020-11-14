import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Coordinators } from 'src/app/models/coordinators';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { UsersService } from 'src/app/Services/userService/users.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {


  users:any;
  userEmail:any;
  emails:any;
  userForm:FormGroup;
  fetchForm:FormGroup;
  fetchValue:Coordinators;
  submitted = false;
  access = false;
  totalSize:number;
  userDetail:any;
  itemPerPage:any = 10;
  paginationConfig:any = {};
  constructor(private userService:UsersService,
    private formBuilder:FormBuilder,
    private coordinatorService:CoordinatorService) { }


  ngOnInit(): void {
    this.fetchForm = this.formBuilder.group({
      userEmail:['',Validators.required],
    });
    this.userForm = this.formBuilder.group({
      userId:['',Validators.required],
      userSurname:['',Validators.required],
      userOtherName:['',Validators.required],
      userEmail:['',Validators.required],
      userPassword:['',Validators.required],
      department:['',Validators.required],
      userPhoneNumber:['',Validators.required],
      userIsActive:['',Validators.required],
      roles: new FormArray([])
    })
    this.AllUsers();
    this.AllEmails();
    this.coordinatorSize();
    this.paginationConfig = {
      itemsPerPage:this.itemPerPage,
      currentPage:1,
      totalItems:this.users ? this.users.length : 0

    }
   console.log(this.paginationConfig)
  }

  get t(){
    return this.g.roles as FormArray;
  }
  roles():FormGroup{
    return this.formBuilder.group({
      roleId:'',
      role:''
    })
  }
  addRole(){
    this.t.push(this.roles());
  }

  onDelete(id){
    console.log(id);
    const value = window.confirm('Note: that deleting a User would terminate the user-access' + 'are you sure you want to delete? ');
    console.log('Alert Response', value);
    if(value){
      this.userService.deleteUserById(id).subscribe(data => {
        this.AllUsers()
      })
    }
    else{
      console.log('Alert Response2', value);
    }
  }
  addUser(){
    document.getElementById('fetch').style.display = 'block'
  }
  get f(){
    return this.fetchForm.controls;
  }
  onfetch(){
    this.submitted = true;
    if(this.fetchForm.invalid){
      return;
    }
    this.userEmail = this.fetchForm.get('userEmail').value;
    console.log(this.userEmail)
    let resp= this.coordinatorService.getCoordinatorByEmail(this.userEmail)
    resp.subscribe((data) => {
      this.fetchValue = data;
      console.log(this.fetchValue);
      let a = this.users[this.totalSize-1].userId + 1;
      this.userForm.patchValue({
        userId:a,
        userSurname:this.fetchValue.coordinatorSurname,
        userOtherName:this.fetchValue.coordinatorOtherName,
        userEmail:this.fetchValue.coordinatorEmail,
        department:this.fetchValue.coordinatorDepartment,
        userPhoneNumber:this.fetchValue.coordinatorPhoneNumber,
        userPassword:this.fetchValue.coordinatorSurname,
        userIsActive:1
      })
    })
    this.addRole()
    document.getElementById('newUser').style.display = 'block';
  }
  get g(){
    return this.userForm.controls;
  }
  grantAccess(){
    this.access = true;
    if(this.userForm.invalid){
      return;
    }
    this.userDetail = this.userForm.value;
    console.log(this.userDetail)
    this.userService.createUser(this.userDetail).subscribe((data) => {
      this.AllUsers()
    })
    this.userForm.reset()
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key).setErrors(null) ;
    });
    document.getElementById('fetch').style.display = 'none'
    document.getElementById('newUser').style.display = 'none'

  }


  AllUsers(){
    let resp = this.userService.getAllUser();
    resp.subscribe((data) => {
      this.users = data;
      console.log(this.users)
    })
    return this.users;
  }

  pageChanged(event){
    this.paginationConfig.currentPage = event;
  }

  AllEmails(){
    let resp = this.coordinatorService.getCoordinatorsEmail();
    resp.subscribe((data) => {
      this.emails = data;
      console.log(this.emails)
    })
  }
  coordinatorSize(){
    let resp = this.coordinatorService.getCoordinatorSize();
    resp.subscribe((data) => {
      this.totalSize = data;
      console.log(this.totalSize);
    })
  }
}
