import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NFT } from 'src/app/core/models/nft.model';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';
import { NftService } from 'src/app/core/services/nft.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit {
  public selected: string = "created";
  public nfts: NFT[] = [];
  public createdNFTs: NFT[] = [];
  public ownedNFTs: NFT[] = [];
  public favouritedNFTs: NFT[] = [];
  public walletAddress: string = '0x2737c01183aA097BbdE6e8cC6a3Eb2E737A88bc7';
  public profile: Profile | undefined;
  public joinedDate: string;

  constructor(
    private coreService: CoreService,
    private authService: AuthService,
    private nftService: NftService) {
    this.profile = this.authService.currentProfileValue;

    this.joinedDate = moment(this.profile!.createdAt).format('MMMM YYYY');
  }

  public async ngOnInit(): Promise<void> {
    this.coreService.getAllNFTS().subscribe(
      (data) => {
        this.nfts = data;
      }
    );

    if(this.profile?.accountId != undefined){
      this.createdNFTs = await this.nftService.getNFTsByCreatorAsync(this.profile?.accountId);
      this.ownedNFTs = await this.nftService.getOwnedNFTsAsync(this.profile?.accountId);
    }
    console.log(this.createdNFTs);
    console.log(this.ownedNFTs);
    
  }

  public select(page:string){
    this.selected = page;
  }
}
