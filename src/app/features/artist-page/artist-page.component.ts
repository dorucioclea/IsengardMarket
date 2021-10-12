import { Component, OnInit } from '@angular/core';
import { NFT } from 'src/app/core/models/nft.model';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit {
  public nfts: NFT[] = [];
  public walletAddress: string = '0x2737c01183aA097BbdE6e8cC6a3Eb2E737A88bc7';
  
  constructor(private coreService: CoreService) {
    
  }

  public ngOnInit(): void {
    this.coreService.getAllNFTS().subscribe(
      (data) => {
        this.nfts = data;
      }
    );
  }
}
