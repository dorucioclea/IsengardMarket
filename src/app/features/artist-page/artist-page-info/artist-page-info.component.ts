import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'app-artist-page-info',
  templateUrl: './artist-page-info.component.html',
  styleUrls: ['./artist-page-info.component.scss']
})

export class ArtistPageInfoComponent implements OnInit {
  @Input() joinedDate: string | undefined;
  @Input() profile: Profile | undefined;
  @Input() reffererProfile: Profile | undefined;

  constructor() {
    console.log("WOA");
  }

  async ngOnInit() {
    console.log("WOA2");
  }
}
