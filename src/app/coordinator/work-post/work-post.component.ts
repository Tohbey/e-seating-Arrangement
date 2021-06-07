import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coordinators } from 'src/app/models/coordinators';
import { ExamSeat } from 'src/app/models/examSeat';
import { Hall } from 'src/app/models/hall';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { HallService } from 'src/app/Services/hallService/hall.service';
import { StudentService } from 'src/app/Services/studentService/student.service';

@Component({
  selector: 'app-work-post',
  templateUrl: './work-post.component.html',
  styleUrls: ['./work-post.component.scss']
})
export class WorkPostComponent implements OnInit {

  coordinatorDetail:Coordinators
  hallDetails:Hall;
  hallSize;
  seatsBySection:ExamSeat[];
  itemPerPage:any = 10;
  paginationConfig:any = {};
  isloading = true;

  constructor(
    private hallService:HallService,
    private studentService:StudentService,
    private BasicAuth:BasicAuthenticationService,
    private coordinatorService:CoordinatorService,
    private router:Router) { }

  ngOnInit(): void {
    this.getCoordinatorDetails()
    this.paginationConfig={
      itemsPerPage:this.itemPerPage,
      currentPage:1,
      totalItems:this.hallDetails ? this.hallDetails.hallSessions[0].seats.length : 0
    };
    console.log(this.paginationConfig)
  }

  showContent(sessionType){
    console.log(sessionType);
    if(document.getElementById(sessionType).classList.contains('show')){
      document.getElementById(sessionType).classList.remove('show')
    }else{
      document.getElementById(sessionType).classList.add('show')
      document.getElementById(sessionType).animate
    }
  }

  pageChanged(event){
    this.paginationConfig.currentPage = event;
  }

  openPage(url,sessionType){
      this.router.navigate([url,sessionType])
  }

  getCoordinatorDetails(){
    let email = this.BasicAuth.getAuthenticatedUser();
    console.log(email)
    let resp = this.coordinatorService.getCoordinatorByEmail(email);
    resp.subscribe((data) => {
      this.coordinatorDetail = data;
      console.log(this.coordinatorDetail)
      this.getHallDetails(this.coordinatorDetail.hallName)
    })
    return this.coordinatorDetail;
  }

  getHallDetails(hallName){
    let resp = this.hallService.getHallByHallName(hallName);
    resp.subscribe((data) => {
      this.hallDetails = data;
      this.isloading = false;
      console.log(this.hallDetails)
    })
    return this.hallDetails
  }
}
