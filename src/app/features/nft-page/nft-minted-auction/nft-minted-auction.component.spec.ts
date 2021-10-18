import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftMintedAuctionComponent } from './nft-minted-auction.component';

describe('NftMintedAuctionComponent', () => {
  let component: NftMintedAuctionComponent;
  let fixture: ComponentFixture<NftMintedAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftMintedAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftMintedAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
