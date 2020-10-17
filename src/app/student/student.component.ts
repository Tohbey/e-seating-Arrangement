import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { BasicAuthenticationService } from '../Services/authenticationService/basic-authentication.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  userDetails:User;

  constructor(
    private BasicAuth:BasicAuthenticationService,
  ) { }

  ngOnInit(): void {
    let email = this.BasicAuth.getAuthenticatedUser();
    console.log(email)
  }
}
