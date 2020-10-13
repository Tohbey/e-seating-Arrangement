import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { BasicAuthenticationService } from '../Services/authenticationService/basic-authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userDetails:User;

  constructor(
    private BasicAuth:BasicAuthenticationService,
  ) { }

  ngOnInit(): void {
    let email = this.BasicAuth.getAuthenticatedUser();
    console.log(email)
  }
}
