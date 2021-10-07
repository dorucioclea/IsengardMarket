import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss']
})
export class SearchNavbarComponent implements OnInit {

  public isLoggedIn: boolean;
  constructor(private profileService: ProfileService) {
    this.isLoggedIn = this.profileService.isLoggedIn;
   }

  ngOnInit(): void {
    
  }

}
