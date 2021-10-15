import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'artist-page-top-info',
  templateUrl: './artist-page-top-info.component.html',
  styleUrls: ['./artist-page-top-info.component.scss']
})
export class ArtistPageTopInfoComponent implements OnInit {
  public _walletAddress: string | undefined;

  @Input()
  set walletAddress(value: string) {
    this.walletAddressToShow = value.slice(0, 5) + "..." + value.slice(-6);
    this._walletAddress = value;
  }

  public walletAddressToShow: string | undefined;

  constructor() {
  }

  ngOnInit() {
  }

}
