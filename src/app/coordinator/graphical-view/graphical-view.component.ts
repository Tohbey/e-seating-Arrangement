import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coordinators } from 'src/app/models/coordinators';
import { ExamSeat } from 'src/app/models/examSeat';
import { ExamSession } from 'src/app/models/examSession';
import { Hall } from 'src/app/models/hall';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { HallService } from 'src/app/Services/hallService/hall.service';

@Component({
  selector: 'app-graphical-view',
  templateUrl: './graphical-view.component.html',
  styleUrls: ['./graphical-view.component.scss']
})
export class GraphicalViewComponent implements OnInit {

  coordinatorDetail:Coordinators
  hallDetails:Hall;
  seats:ExamSeat[];
  seatsBySection:ExamSession;
  itemPerPage:any = 10;
  paginationConfig:any = {};

  constructor(
    private hallService:HallService,
    private BasicAuth:BasicAuthenticationService,
    private coordinatorService:CoordinatorService,
    private actRouter: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    const sessionType = this.actRouter.snapshot.params['sessionType']
    console.log(sessionType)
    this.getCoordinatorDetails(sessionType);
    this.paginationConfig={
        itemsPerPage:this.itemPerPage,
        currentPage:1,
        totalItems:this.hallDetails ? this.hallDetails.hallSessions[0].seats.length : 0,
      };
      console.log(this.paginationConfig)
  }


  pageChanged(event){
    this.paginationConfig.currentPage = event;
  }

  getCoordinatorDetails(sessionType){
    let email = this.BasicAuth.getAuthenticatedUser();
    let resp = this.coordinatorService.getCoordinatorByEmail(email);
    resp.subscribe((data) => {
      this.coordinatorDetail = data;
      this.getHallDetails(this.coordinatorDetail.hallName,sessionType)
    })
    return this.coordinatorDetail;
  }

  getHallDetails(hallName,sessionType){
    let resp = this.hallService.getHallByHallName(hallName);
    resp.subscribe((data) => {
      this.hallDetails = data;
      this.getHallSessions(hallName,sessionType)
    })
  }

  getHallSessions(hallName,sessionType){
    let resp = this.hallService.getExamSessions(hallName,sessionType);
    resp.subscribe((data) => {
      this.seatsBySection = data
      console.log(this.seatsBySection)
    })
  }
}
