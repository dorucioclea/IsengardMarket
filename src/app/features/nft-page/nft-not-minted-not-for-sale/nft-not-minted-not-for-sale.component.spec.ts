import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftNotMintedNotForSaleComponent } from './nft-not-minted-not-for-sale.component';

describe('NftNotMintedNotForSaleComponent', () => {
  let component: NftNotMintedNotForSaleComponent;
  let fixture: ComponentFixture<NftNotMintedNotForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftNotMintedNotForSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftNotMintedNotForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
