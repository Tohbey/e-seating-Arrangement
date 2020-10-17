import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/Services/authenticationService/basic-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private basicAuth:BasicAuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.basicAuth.logout();
    this.router.navigate(['/login'])
  }
}
