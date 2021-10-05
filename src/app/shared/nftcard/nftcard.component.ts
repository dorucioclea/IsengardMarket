import { Component, Input, OnInit } from '@angular/core';
import { NFT } from 'src/app/core/models/nft.model';

@Component({
  selector: 'app-nftcard',
  templateUrl: './nftcard.component.html',
  styleUrls: ['./nftcard.component.scss']
})
export class NFTCardComponent implements OnInit {
  @Input() public nft!: NFT;
  public imageURI: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
  constructor() { }

  ngOnInit(): void {
    this.parseURI(this.nft.uris[0]);
  }

  public parseURI(binary: string): void {
    this.imageURI = atob(binary);
  }
}
