import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss']
})
export class SearchNavbarComponent implements OnInit {

  public currentProfile: Profile | undefined;
  public isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentProfile = this.authService.currentProfileValue;
   }

  ngOnInit(): void {
  }

}
