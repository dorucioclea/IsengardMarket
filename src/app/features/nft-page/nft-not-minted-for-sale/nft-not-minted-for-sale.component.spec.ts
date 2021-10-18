import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftNotMintedForSaleComponent } from './nft-not-minted-for-sale.component';

describe('NftNotMintedForSaleComponent', () => {
  let component: NftNotMintedForSaleComponent;
  let fixture: ComponentFixture<NftNotMintedForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftNotMintedForSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftNotMintedForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
