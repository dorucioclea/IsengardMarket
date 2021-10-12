import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroNFTComponent } from './hero-nft.component';

describe('HeroNFTComponent', () => {
  let component: HeroNFTComponent;
  let fixture: ComponentFixture<HeroNFTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroNFTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroNFTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
