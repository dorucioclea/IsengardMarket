import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NFT } from 'src/app/core/models/nft.model';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit {
  public nfts: NFT[] = [];
  public walletAddress: string = '0x2737c01183aA097BbdE6e8cC6a3Eb2E737A88bc7';
  public profile: Profile | undefined;
  public joinedDate: string;

  constructor(private coreService: CoreService, private authService: AuthService) {
    this.profile = this.authService.currentProfileValue;

    this.joinedDate = moment(this.profile!.createdAt).format('MMMM YYYY');
  }

  public ngOnInit(): void {
    this.coreService.getAllNFTS().subscribe(
      (data) => {
        this.nfts = data;
      }
    );
  }
}
