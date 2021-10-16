import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'artist-page-top-info',
  templateUrl: './artist-page-top-info.component.html',
  styleUrls: ['./artist-page-top-info.component.scss']
})
export class ArtistPageTopInfoComponent implements OnInit {
  public _walletAddress: string | undefined;
  public _profile : Profile | undefined;

  @Input()
  set profile (profile: Profile | undefined){
    this._profile = profile;
    this._walletAddress = profile?.accountId;
  }

  public walletAddressToShow: string | undefined;

  constructor() {
  }

  ngOnInit() {
  }

}
