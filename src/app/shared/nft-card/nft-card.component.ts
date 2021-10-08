import { Component, Input, OnInit } from '@angular/core';
import { NFT } from 'src/app/core/models/nft.model';

@Component({
  selector: 'app-nftcard',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss']
})
export class NFTCardComponent implements OnInit {
  @Input() public nft!: NFT;
  public imageURI: string = '';
  public isVideoNFT: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.parseURI(this.nft.uris[0]);
  }

  public parseURI(binary: string): void {
    this.imageURI = atob(binary);
    if (this.imageURI.includes('mp4') ||
      this.imageURI.includes('mp3') ||
      this.imageURI.includes('wmw') ||
      this.imageURI.includes('aac') ||
      this.imageURI.includes('aac') ||
      this.imageURI.includes('heic')) {
      this.isVideoNFT = true;
    }
  }
}
