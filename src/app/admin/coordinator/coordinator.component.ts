import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coordinators } from 'src/app/models/coordinators';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { HallService } from 'src/app/Services/hallService/hall.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss']
})
export class CoordinatorComponent implements OnInit {

  coordinatorsForm:FormGroup;
  coordinatorUpdate:FormGroup;
  coordinatorDetail:Coordinators;
  submitted = false;
  constructor(private formBuilder:FormBuilder,
    private coordinatorService:CoordinatorService,
    private hallService:HallService) { }
  coordinators:any;
  updatedDetail:Coordinators;
  hallNames:String[];
  id:String;
  itemPerPage:any = 10;
  paginationConfig:any = {};

  ngOnInit(): void {
    this.coordinatorsForm = this.formBuilder.group({
      id:[''],
      coordinatorId: ['',Validators.required],
      coordinatorSurname:  ['',Validators.required],
      coordinatorOtherName:  ['',Validators.required],
      coordinatorEmail:  ['',Validators.required],
      coordinatorDepartment:  ['',Validators.required],
      hallName:  [''],
      faculty: ['',Validators.required],
      coordinatorPhoneNumber: ['',Validators.required],
      coordinatorFullName:[''],
    });
    this.coordinatorUpdate = this.formBuilder.group({
      id:[''],
      coordinatorId: ['',Validators.required],
      coordinatorSurname:  ['',Validators.required],
      coordinatorOtherName:  ['',Validators.required],
      coordinatorEmail:  ['',Validators.required],
      coordinatorDepartment:  ['',Validators.required],
      hallName:  [''],
      faculty: ['',Validators.required],
      coordinatorPhoneNumber: ['',Validators.required],
      coordinatorFullName:[''],
    })
   this.AllCoordinator();
   this.AllHallRoom();
   this.paginationConfig={
    itemsPerPage:this.itemPerPage,
    currentPage:1,
    totalItems:this.coordinators ? this.coordinators.length : 0
  };
  console.log(this.paginationConfig)
  }

  get f(){
    return this.coordinatorsForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.coordinatorsForm.invalid){
        return;
      }
    this.coordinatorDetail = this.coordinatorsForm.value;
    console.log(this.coordinatorDetail);
    this.coordinatorService.createCoordinator(this.coordinatorDetail).subscribe((data:{})=>{
      this.AllCoordinator()
    })
    this.coordinatorsForm.reset();
    Object.keys(this.coordinatorsForm.controls).forEach(key => {
      this.coordinatorsForm.get(key).setErrors(null) ;
    });
    document.getElementById('newCoordinator').style.display = 'none';
  }

  get g(){
    return this.coordinatorUpdate.controls;
  }

  onUpdate(){
    this.submitted = true;
    if(this.coordinatorUpdate.invalid){
      return;
    }
    this.updatedDetail = this.coordinatorUpdate.value;
    console.log(this.updatedDetail);
    this.coordinatorService.updateCoordinator(this.updatedDetail.id,this.updatedDetail).subscribe((data) => {
      this.AllCoordinator();
    });
    this.coordinatorsForm.reset();
    Object.keys(this.coordinatorsForm.controls).forEach(key => {
      this.coordinatorsForm.get(key).setErrors(null) ;
    });
    document.getElementById('updateCoordinator').style.display = 'none'
  }

  AllCoordinator(){
    let resp = this.coordinatorService.getAllCoordinators();
    resp.subscribe((data) => {
      this.coordinators = data;
      console.log(this.coordinators)
    })
    return this.coordinators;
  }

  pageChanged(event){
    this.paginationConfig.currentPage = event;
  }

  AllHallRoom(){
    let resp = this.hallService.getAllHallNames();
    resp.subscribe((data) => {
      this.hallNames = data;
      console.log(this.hallNames)
    })
  }

  onDelete(id:String){
    console.log(id);
    const value = window.confirm('Note: that deleting a coordinator would terminate the coordinator' + 'are you sure you want to delete? ');
    console.log('Alert Response', value);
    if(value){
      this.coordinatorService.deleteCoordinator(id).subscribe(data => {
        this.AllCoordinator()
      })
    }
    else{
      console.log('Alert Response2', value);
    }
  }

  onEdit(id:string,coordinator:Coordinators){
    const value = window.confirm('are you sure you want to update Coordinaotor? ');
    console.log('Alert Response', value);
    if(value){
      console.log(id,coordinator)
      document.getElementById('updateCoordinator').style.display = 'block'
      this.coordinatorUpdate.patchValue({
        coordinatorWorkPost:coordinator.hallName
      })
      this.coordinatorUpdate.patchValue(coordinator);
    }else{
      console.log('Response: ',value);
    }
  }

  addCoordinator(){
    document.getElementById('newCoordinator').style.display = 'block';
  }

}
