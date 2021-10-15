import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/core/models/collection.model';
import { NFT } from 'src/app/core/models/nft.model';
import { Profile } from 'src/app/core/models/profile';
import { NftService } from 'src/app/core/services/nft.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-nft-page',
  templateUrl: './nft-page.component.html',
  styleUrls: ['./nft-page.component.scss']
})
export class NFTPageComponent implements OnInit {

  public nft: NFT | undefined;
  private nftIdentifier: string | undefined;
  public owner : Profile | undefined;
  public ownerUsername: string | undefined;
  public creator : Profile | undefined;
  public creatorUsername: string | undefined;
  public collection: Collection  | undefined;

  constructor(
    private nftService: NftService, 
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
    ) {
    this.activatedRoute.params.subscribe(params => {
      this.nftIdentifier = params['nftAddress'];
    })
  }

  async ngOnInit(): Promise<void> {
    if (this.nftIdentifier != undefined) {
      this.nft = await this.nftService.getNftAsync(this.nftIdentifier);

      this.creator = await this.profileService.getProfileAsync(this.nft.creator);
      this.creatorUsername = this.nft.creator;
      if(this.creator != undefined){
        this.creatorUsername = this.creator.username
      }

      this.ownerUsername = this.nft.owner;
      this.owner = await this.profileService.getProfileAsync(this.nft.owner)
      if(this.owner != undefined){
        this.ownerUsername = this.owner.username
      }
      
      this.collection = await this.nftService.getCollectionAsync(this.nft.collection);
      console.log(this.collection);
      console.log(this.nft);

      // Try to parse attributes.
      console.log(atob(this.nft.attributes));
      console.log(JSON.parse(atob(this.nft.attributes)));
    }
  }

}
