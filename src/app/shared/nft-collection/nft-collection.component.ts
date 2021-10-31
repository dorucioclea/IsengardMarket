import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NFTCollection } from 'src/app/core/models/nft-collection.model';

@Component({
  selector: 'app-nft-collection',
  templateUrl: './nft-collection.component.html',
  styleUrls: ['./nft-collection.component.scss']
})
export class NFTCollectionComponent implements OnInit {
  @HostListener('click', ['$event.target'])
  onClickBtn() {
    this.router.navigate([`/collection/${this.collection.collection}`])
  }
  @Input() public collection!: NFTCollection;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
