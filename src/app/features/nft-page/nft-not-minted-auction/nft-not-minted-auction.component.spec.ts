import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftNotMintedAuctionComponent } from './nft-not-minted-auction.component';

describe('NftNotMintedAuctionComponent', () => {
  let component: NftNotMintedAuctionComponent;
  let fixture: ComponentFixture<NftNotMintedAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftNotMintedAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftNotMintedAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
