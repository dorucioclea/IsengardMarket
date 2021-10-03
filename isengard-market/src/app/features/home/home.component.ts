import { Component, OnInit } from '@angular/core';
import { NFTCollection } from 'src/app/core/models/nft-collection.model';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public nftCollections: NFTCollection[] = [];

  constructor(
    private coreService: CoreService
  ) { }

  public ngOnInit(): void {
    this.coreService.getAllCollections().subscribe(
      (data) => {
        this.nftCollections = data;
      }
    );
  }

}
