import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/core/models/collection.model';
import { NFT } from 'src/app/core/models/nft.model';
import { NftService } from 'src/app/core/services/nft.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {
  nfts: NFT[] | undefined;
  collection: Collection | undefined

  constructor(private nftService: NftService) {
  }

  async ngOnInit() {
    this.collection = await this.nftService.getCollectionAsync("4STICK-fe3198");
    this.nfts = await this.nftService.getNFTsInCollectionAsync("4STICK-fe3198");
  }

}
