import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  collectionAddress: string | undefined;

  constructor(private nftService: NftService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.collectionAddress = params['collectionAddress'];
    });
  }

  async ngOnInit() {
    if (this.collectionAddress) {
      this.collection = await this.nftService.getCollectionAsync(this.collectionAddress);
      this.nfts = await this.nftService.getNFTsInCollectionAsync(this.collectionAddress);
    }

  }

}
