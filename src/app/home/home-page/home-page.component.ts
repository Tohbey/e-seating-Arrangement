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
  menuOpen = false;

  constructor() {}
  ngOnInit(): void {}

  openMenu(){
    let menuBtn = document.querySelector('.hamburger--container')
    let navigation = document.querySelector('.navigation')
    if(!this.menuOpen){
      menuBtn.classList.add('open');
      this.menuOpen = true;
      navigation.classList.add('navigation-open')
    }
    else{
      menuBtn.classList.remove('open');
      this.menuOpen = false;
      navigation.classList.remove('navigation-open')
    }
  }
}
