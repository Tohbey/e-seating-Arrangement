import { Component, OnInit } from '@angular/core';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  twitter = faTwitter;
  facebook = faFacebookF;
  linkedin = faLinkedinIn;
  instagram = faInstagram;

  constructor() { }

  ngOnInit(): void {
  }

}
