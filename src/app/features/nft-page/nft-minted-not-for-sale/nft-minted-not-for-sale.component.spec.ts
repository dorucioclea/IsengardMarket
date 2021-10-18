import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftMintedNotForSaleComponent } from './nft-minted-not-for-sale.component';

describe('NftMintedNotForSaleComponent', () => {
  let component: NftMintedNotForSaleComponent;
  let fixture: ComponentFixture<NftMintedNotForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftMintedNotForSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftMintedNotForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
