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
import { NFTCollectionComponent } from "./nft-collection/nft-collection.component";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    NFTCardComponent,
    SearchNavbarComponent,
    InfoFooterComponent,
    MagicCardCaruselComponent,
    HeroNFTComponent,
    NameCardComponent,
    NFTCollectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    NFTCardComponent,
    SearchNavbarComponent,
    InfoFooterComponent,
    MagicCardCaruselComponent,
    HeroNFTComponent,
    NameCardComponent,
    NFTCollectionComponent
  ]
})

export class SharedClassicModule { }
