import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftMintedForSaleComponent } from './nft-minted-for-sale.component';

describe('NftMintedForSaleComponent', () => {
  let component: NftMintedForSaleComponent;
  let fixture: ComponentFixture<NftMintedForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftMintedForSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftMintedForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
