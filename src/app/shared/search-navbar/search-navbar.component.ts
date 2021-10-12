import { Component, HostListener, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss']
})
export class SearchNavbarComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    let element = document.querySelector('.main-container') as HTMLElement;
    //it means that if the scroll is higher than the heght of our component(70px) + 30px apply the style of scrolled navbar
    console.log(window.scrollY);
    if (window.scrollY > element.clientHeight + 20) {
      element.classList.add('navbar-scrolled');
      console.log("MEME");
    } else {
      element.classList.remove('navbar-scrolled');
      console.log("123");
    }
  }
  public currentProfile: Profile | undefined;
  public isLoggedIn: boolean;


  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentProfile = this.authService.currentProfileValue;
   }

  ngOnInit(): void {
  }

}
