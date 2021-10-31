import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'artist-page-top-info',
  templateUrl: './artist-page-top-info.component.html',
  styleUrls: ['./artist-page-top-info.component.scss']
})
export class ArtistPageTopInfoComponent implements OnInit {
  @Input() profile!: Profile;

  constructor() {
    console.log("WOA3");
  }

  ngOnInit() {
    console.log("WOA3");
  }

}
