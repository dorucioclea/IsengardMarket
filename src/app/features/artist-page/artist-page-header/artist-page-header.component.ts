import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'artist-page-header',
  templateUrl: './artist-page-header.component.html',
  styleUrls: ['./artist-page-header.component.scss']
})
export class ArtistPageHeaderComponent {
  public _walletAddress: string | undefined;
  public _profile: Profile | undefined;

  @Input()
  set profile(profile: Profile | undefined) {
    this._profile = profile;
    this._walletAddress = profile?.accountId;
  }

  public walletAddressToShow: string | undefined;

  constructor() {
    console.log(this._profile);
  }

  ngOnInit() {
  }
}
