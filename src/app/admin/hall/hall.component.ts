import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExamSession } from 'src/app/models/examSession';
import { Hall } from 'src/app/models/hall';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { HallService } from 'src/app/Services/hallService/hall.service';
import { NotificationService } from 'src/app/Services/notification/notification.service';
import { faTrash, faPen,faEye} from '@fortawesome/free-solid-svg-icons'
import { Mode } from 'src/app/models/mode';
import { Programme } from 'src/app/models/programme';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {

  delete = faTrash;
  edit = faPen;
  view = faEye;
  hallForm:FormGroup;
  hallUpdate:FormGroup;
  HallNameForm:FormGroup;
  hallDetail:Hall;
  hallView:Hall;
  hallUpdateValue:Hall;
  halls:any;
  submitted = false;
  coordinatorNames:String[];
  hallNames:String[]
  mode:Mode;
  session:ExamSession[]=[];
  title="e-Seating Arrangemnt";
  itemsPerPage:any = 5;
  paginationConfig:any= {};
  programmeObject:Programme

  constructor(private formBuilder:FormBuilder,
    private hallService:HallService,
    private coordinatorService:CoordinatorService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.hallForm = this.formBuilder.group({
      hallName:['',Validators.required],
      hallSize:['',Validators.required],
      hallRow:['',Validators.required],
      hallColumn:['',Validators.required],
      rowSection:['',Validators.required],
      department:['',Validators.required],
      faculty:['Engineering'],
      hallMainCoordinator:[''],
      hallAssistanceCoordinator:[''],
    })
    this.hallUpdate = this.formBuilder.group({
      id:[''],
      hallName:['',Validators.required],
      hallSize:['',Validators.required],
      hallRow:['',Validators.required],
      hallColumn:['',Validators.required],
      rowSection:['',Validators.required],
      department:['',Validators.required],
      hallMainCoordinator:[''],
      faculty:['Engineering'],
      hallAssistanceCoordinator:[''],
    })
    this.HallNameForm = this.formBuilder.group({
      hallName:['',Validators.required],
      mode:['', Validators.required]
    })
    this.AllHall();
    this.AllCoordinatorNames();
    this.getAllNames();
    this.paginationConfig={
      itemsPerPage:this.itemsPerPage,
      currentPage:1,
      totalItems:this.halls ? this.halls.length : 0
    };
    console.log(this.paginationConfig)
    this.getTotal();
  }
  get f(){
    return this.hallForm.controls
  }

  onSubmit(){
    this.submitted = true;
    if(this.hallForm.invalid){
      return;
    }
    this.hallDetail = this.hallForm.value;
    this.hallDetail.faculty = "Engineering";
    console.log(this.hallDetail);
    this.hallService.createHall(this.hallDetail).subscribe((data)=>{
      this.AllHall()
    })
    this.hallForm.reset();
    Object.keys(this.hallForm.controls).forEach(key => {
      this.hallForm.get(key).setErrors(null) ;
    });
    document.getElementById('newHall').style.display = 'none';
  }

  get g(){
    return this.hallUpdate.controls
  }

  onUpdate(){
    this.submitted = true;
    if(this.hallUpdate.invalid){
      return;
    }
    this.hallUpdateValue = this.hallUpdate.value;
    this.hallUpdateValue.faculty = "Engineering";
    console.log(this.hallUpdateValue);
    this.hallService.updateHall(this.hallUpdateValue.id,this.hallUpdateValue).subscribe((data) => {
      this.notifyService.showSuccess("Hall has been Updated Successfully "+this.hallUpdateValue.hallName,this.title)
      this.AllHall();
    });
    this.hallUpdate.reset();
    Object.keys(this.hallUpdate.controls).forEach(key => {
      this.hallUpdate.get(key).setErrors(null) ;
    });
    document.getElementById('updateHall').style.display = 'none'
  }

  get h(){
    return this.HallNameForm.controls;
  }

  generateSeat(){
    let hallName = this.HallNameForm.get('hallName').value;
    this.mode = {
      mode: this.HallNameForm.get('mode').value
    }

    console.log(hallName, this.mode)
    let resp = this.hallService.generateExamSessions(hallName, this.mode);
    resp.subscribe((data) => {
      this.session.push(data);
      this.notifyService.showSuccess("Seats has been generated "+this.session[0].seats.length,this.title)
      this.AllHall();
    })

    console.log("Generated Successfully");
  }

  onDIsplay(){
    document.getElementById('generate').style.display = 'block'
    document.getElementById('newHall').style.display = 'none';
    document.getElementById('updateHall').style.display ='none';
    document.getElementById('view').style.display ='none';
    document.getElementById('seatsPerProgramme').style.display ='none'
  }

  AllHall(){
    let resp = this.hallService.getAllHall();
    resp.subscribe((data) => {
      this.halls = data;
      console.log(this.halls)
    })
    return this.halls;
  }

  pageChanged(event){
    this.paginationConfig.currentPage = event;
  }

  AllCoordinatorNames(){
    let resp = this.coordinatorService.getCoordinatorsName();
    resp.subscribe((data) => {
      this.coordinatorNames =data;
      console.log(this.coordinatorNames);
    })
    return this.coordinatorNames;
  }

  addHall(){
    document.getElementById('newHall').style.display = 'block';
    document.getElementById('updateHall').style.display ='none';
    document.getElementById('view').style.display ='none';
    document.getElementById('generate').style.display = 'none';
  }

  onDelete(id:String){
    console.log(id);
    const value = window.confirm('Note: that deleting a coordinator would terminate the coordinator' + 'are you sure you want to delete? ');
    console.log('Alert Response', value);
    if(value){
      this.hallService.deleteHallById(id).subscribe(data => {
        this.notifyService.showInfo("Hall has been deleted",this.title);
        this.AllHall();
      })
    }
    else{
      console.log('Alert Response2', value);
    }
  }

  onEdit(id:string,hall:Hall){
    const value = window.confirm('are you sure you want to update Coordinaotor? ');
    console.log('Alert Response', value);
    if(value){
      console.log(id,hall)
      document.getElementById('updateHall').style.display = 'block';
      document.getElementById('newHall').style.display = 'none';
      document.getElementById('view').style.display ='none';
      document.getElementById('generate').style.display = 'none';
      this.hallUpdate.patchValue(hall);
      this.hallUpdate.patchValue({
        coordinatorName:hall.hallMainCoordinator,
        assCoordinatorName:hall.hallAssistanceCoordinator
      })
    }else{
      console.log('Response: ',value);
    }
  }
  onView(id){
    console.log(id)
    document.getElementById('view').style.display = 'block';
    document.getElementById('newHall').style.display = 'none';
    document.getElementById('updateHall').style.display ='none';
    document.getElementById('generate').style.display = 'none';
    let resp = this.hallService.getHallById(id);
    resp.subscribe((data) => {
      this.hallView = data
      console.log('hall Detail: ',this.hallView)
    })
  }
  getAllNames(){
    let resp = this.hallService.getAllHallNames();
    resp.subscribe((data) => {
      this.hallNames = data
      console.log(this.hallNames)
    })
  }

  getTotal(){
    let resp = this.hallService.getSeatsPerProgramme();
    resp.subscribe((data) => {
      this.programmeObject = data
      console.log("break down ",this.programmeObject)
    })
  }

  onShow(){
    document.getElementById('generate').style.display = 'none'
    document.getElementById('newHall').style.display = 'none';
    document.getElementById('updateHall').style.display ='none';
    document.getElementById('view').style.display ='none';
    document.getElementById('seatsPerProgramme').style.display ='block'
  }
}
