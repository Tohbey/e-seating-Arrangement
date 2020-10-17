import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coordinators } from 'src/app/models/coordinators';
import { Hall } from 'src/app/models/hall';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';
import { CoordinatorService } from 'src/app/Services/coordinatorService/coordinator.service';
import { HallService } from 'src/app/Services/hallService/hall.service';
import { StudentService } from 'src/app/Services/studentService/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  coordinatorDetail:Coordinators
  hallDetails:Hall;
  hallSize;
  students;

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
    this.getCoordinatorDetails(sessionType);
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
      this.fetchStudents(hallName,sessionType)
    })
    return this.hallDetails
  }
  fetchStudents(hallName,sessionType){
    let resp = this.hallService.fetchStudent(hallName,sessionType);
    resp.subscribe((data) => {
      this.students = data;
      console.log(this.students)
    })
    return this.students
  }
}
