import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { BasicAuthenticationService } from '../Services/authenticationService/basic-authentication.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss']
})
export class CoordinatorComponent implements OnInit {

  userDetails:User;

  constructor(
    private BasicAuth:BasicAuthenticationService,
  ) { }

  ngOnInit(): void {
    let email = this.BasicAuth.getAuthenticatedUser();
    console.log(email)
  }
}
