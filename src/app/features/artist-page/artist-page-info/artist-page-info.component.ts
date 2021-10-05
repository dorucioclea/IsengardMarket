import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-artist-page-info',
  templateUrl: './artist-page-info.component.html',
  styleUrls: ['./artist-page-info.component.scss']
})

export class ArtistPageInfoComponent implements OnInit {
  public walletAddress: string | undefined;

  constructor (private coreService: CoreService) 
  { 
    this.walletAddress = '0x2737c01183aA097BbdE6e8cC6a3Eb2E737A88bc7';
  }

  ngOnInit() {
  }
}
