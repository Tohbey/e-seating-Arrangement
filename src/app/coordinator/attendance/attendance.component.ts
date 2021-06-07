import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coordinators } from 'src/app/models/coordinators';
import { ExamSession } from 'src/app/models/examSession';
import { Hall } from 'src/app/models/hall';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { HallService } from 'src/app/Services/hallService/hall.service';
import { StudentService } from 'src/app/Services/studentService/student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  coordinatorDetail:Coordinators
  hallDetails:Hall;
  hallSize;
  seatsBySection:ExamSession;
  isloading = true;
  itemPerPage = 15;


  constructor(
    private hallService:HallService,
    private studentService:StudentService,
    private BasicAuth:BasicAuthenticationService,
    private coordinatorService:CoordinatorService,
    private actRouter: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    const sessionType = this.actRouter.snapshot.params['sessionType']
    console.log(sessionType)
    this.getCoordinatorDetails(sessionType)
  }

  getCoordinatorDetails(sessionType){
    let email = this.BasicAuth.getAuthenticatedUser();
    console.log(email)
    let resp = this.coordinatorService.getCoordinatorByEmail(email);
    resp.subscribe((data) => {
      this.coordinatorDetail = data;
      console.log(this.coordinatorDetail)
      this.getHallDetails(this.coordinatorDetail.hallName,sessionType)
    })
    return this.coordinatorDetail;
  }

  getHallDetails(hallName,sessionType){
    let resp = this.hallService.getHallByHallName(hallName);
    resp.subscribe((data) => {
      this.hallDetails = data;
      console.log(this.hallDetails)
      this.getHallSessions(hallName,sessionType)
    })
    return this.hallDetails
  }
  getHallSessions(hallName,sessionType){
    let resp = this.hallService.getExamSessions(hallName,sessionType);
    resp.subscribe((data) => {
      this.seatsBySection = data
      this.isloading = false;
      console.log(this.seatsBySection)
    })
  }
}
