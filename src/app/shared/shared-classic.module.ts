import { NgModule } from "@angular/core";
import { InfoFooterComponent } from './info-footer/info-footer.component';
import { MagicCardCaruselComponent } from './magic-card-carusel/magic-card-carusel.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SearchNavbarComponent } from "./search-navbar/search-navbar.component";
import { NFTCardComponent } from "./nft-card/nft-card.component";
import { HeroNFTComponent } from './hero-nft/hero-nft.component';
import { NameCardComponent } from './name-card/name-card.component';


@NgModule({
  declarations: [
    NFTCardComponent,
    SearchNavbarComponent,
    InfoFooterComponent,
    MagicCardCaruselComponent,
    HeroNFTComponent,
    NameCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ],
  exports: [
    NFTCardComponent,
    SearchNavbarComponent,
    InfoFooterComponent,
    MagicCardCaruselComponent,
    HeroNFTComponent,
    NameCardComponent
  ]
})

export class SharedClassicModule { }
