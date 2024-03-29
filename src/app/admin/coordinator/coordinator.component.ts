import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coordinators } from 'src/app/models/coordinators';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { HallService } from 'src/app/Services/hallService/hall.service';
import { NotificationService } from 'src/app/Services/notification/notification.service';
import { faTrash, faPen} from '@fortawesome/free-solid-svg-icons'
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
    private coordinatorService:CoordinatorService,private notifyService : NotificationService,
    private hallService:HallService) { }
  coordinators:any;
  updatedDetail:Coordinators;
  hallNames:String[];
  id:String;
  itemPerPage:any = 10;
  paginationConfig:any = {};
  title="e-Seating Arrangemnt";
  delete = faTrash
  edit = faPen
  isloading:Boolean = true;


  ngOnInit(): void {
    this.coordinatorsForm = this.formBuilder.group({
      id:[''],
      coordinatorSurname:  ['',Validators.required],
      coordinatorOtherName:  ['',Validators.required],
      coordinatorEmail:  ['',Validators.required],
      coordinatorDepartment:  ['',Validators.required],
      faculty: ['',Validators.required],
      coordinatorPhoneNumber: ['',Validators.required],
      coordinatorFullName:[''],
    });
    this.coordinatorUpdate = this.formBuilder.group({
      id:[''],
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
    this.coordinatorService.createCoordinator(this.coordinatorDetail).subscribe((data:{})=>{
      this.notifyService.showSuccess("Coordinator has been Created Successfully ",this.title)
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
    this.coordinatorService.updateCoordinator(this.updatedDetail.id,this.updatedDetail).subscribe((data) => {
      this.notifyService.showSuccess("Coordinator has been Updated Successfully ",this.title)
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
      this.isloading = false
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
    })
  }

  onDelete(id:String){
    const value = window.confirm('Note: that deleting a coordinator would terminate the coordinator' + 'are you sure you want to delete? ');
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
    if(value){
      document.getElementById('updateCoordinator').style.display = 'block'
      document.getElementById('newCoordinator').style.display = 'none';
      this.coordinatorUpdate.patchValue({
        coordinatorWorkPost:coordinator.hallName
      })
      this.coordinatorUpdate.patchValue(coordinator);
    }else{
      console.log('Response: ',value);
    }
  }

  addCoordinator(){
    document.getElementById('updateCoordinator').style.display = 'none'
    document.getElementById('newCoordinator').style.display = 'block';
  }

}
