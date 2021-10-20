import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NFT } from 'src/app/core/models/nft.model';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';
import { NftService } from 'src/app/core/services/nft.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit {
  public selected: string = "owned";
  public nfts: NFT[] = [];
  public createdNFTs: NFT[] = [];
  public ownedNFTs: NFT[] = [];
  public favouritedNFTs: NFT[] = [];
  public walletAddress: string | undefined;
  public profile: Profile | undefined;
  public joinedDate: string | undefined;
  public userBrowsing = false;


  // On change of activatedRoute please rerun onInit. Move some of the code there ( like userBrowsing ) and rerun;
  constructor(
    private coreService: CoreService,
    private profileService: ProfileService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private nftService: NftService) {
    this.activatedRoute.params.subscribe(params => {
      this.walletAddress = params['artistAddress'];
    });
  }

  public async ngOnInit(): Promise<void> {
    this.coreService.getAllNFTS().subscribe(
      (data) => {
        this.nfts = data;
      }
    );

    if(this.walletAddress != undefined){
      this.profile = await this.profileService.getProfileAsync(this.walletAddress);
      this.createdNFTs = await this.nftService.getNFTsByCreatorAsync(this.walletAddress);
      this.ownedNFTs = await this.nftService.getOwnedNFTsAsync(this.walletAddress);
      this.joinedDate = moment(this.profile!.createdAt).format('MMMM YYYY');
    }

    if(this.authService.currentProfileValue?.accountId == this.walletAddress){
      this.userBrowsing = true;
    }
  }

  public select(page:string){
    this.selected = page;
  }
}
