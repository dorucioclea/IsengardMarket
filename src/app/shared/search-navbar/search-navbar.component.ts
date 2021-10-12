import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss']
})
export class SearchNavbarComponent implements OnInit {
  @Input() initalStyle: 'black' | 'white' = 'black';
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.main-container') as HTMLElement;
    //it means that if the scroll is higher than the heght of our component(70px) + 30px apply the style of scrolled navbar
    if (window.scrollY > element.clientHeight + 15) {
      element.classList.add('navbar-scrolled');
    } else {
      element.classList.remove('navbar-scrolled');
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
