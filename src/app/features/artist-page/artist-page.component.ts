import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NFT } from 'src/app/core/models/nft.model';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';
import { NftService } from 'src/app/core/services/nft.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { favoritesMockNFTS } from './mocked-favoritesNFTS';

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
  public profileName: string | undefined;
  public profile: Profile | undefined;
  public reffererProfile : Profile | undefined;
  public joinedDate: string | undefined;
  public userBrowsing = false;
  mockedNFTS: NFT[] = favoritesMockNFTS;


  // On change of activatedRoute please rerun onInit. Move some of the code there ( like userBrowsing ) and rerun;
  constructor(
    private coreService: CoreService,
    private profileService: ProfileService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private nftService: NftService) {
    this.activatedRoute.params.subscribe(params => {
      this.profileName = params['artistAddress'];
    });
  }

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async routeParams => {
      await this.loadData();
    });
  }

  private async loadData(){
    this.coreService.getAllNFTS().subscribe(
      (data) => {
        this.nfts = data;
      }
    );

    if (this.profileName != undefined) {

      if (this.authService.currentProfileValue?.username == this.profileName) {
        this.userBrowsing = true;
      }

      this.profile = await this.profileService.getProfileAsync(this.profileName);
      if(this.profile.refferer != undefined){
        this.reffererProfile = await this.profileService.getProfileAsync(this.profile.refferer)
      }else{
        this.reffererProfile = undefined;
      }
      
      this.joinedDate = moment(this.profile!.createdAt).format('MMMM YYYY');

      this.createdNFTs = await this.nftService.getNFTsByCreatorAsync(this.profile.accountId!);
      this.ownedNFTs = await this.nftService.getOwnedNFTsAsync(this.profile.accountId!);
    }
  }

  public select(page: string) {
    this.selected = page;
  }
}
