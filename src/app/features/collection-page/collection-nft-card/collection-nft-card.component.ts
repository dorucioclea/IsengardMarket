import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'collection-nft-card',
  templateUrl: './collection-nft-card.component.html',
  styleUrls: ['./collection-nft-card.component.scss']
})
export class CollectionNftCardComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() collectionName: string | undefined;
  @Input() photo: string | undefined;

  constructor() { }

  ngOnInit() {
  }

}
