import { NgModule } from "@angular/core";
import { InfoFooterComponent } from './info-footer/info-footer.component';
import { MagicCardCaruselComponent } from './magic-card-carusel/magic-card-carusel.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchNavbarComponent } from "./search-navbar/search-navbar.component";
import { NFTCardComponent } from "./nft-card/nft-card.component";
import { HeroNFTComponent } from './hero-nft/hero-nft.component';
import { NameCardComponent } from './name-card/name-card.component';
import { NFTCollectionComponent } from "./nft-collection/nft-collection.component";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { MaterialModule } from "./material-module/material-shared.module";

@NgModule({
  declarations: [
    NFTCardComponent,
    SearchNavbarComponent,
    InfoFooterComponent,
    MagicCardCaruselComponent,
    HeroNFTComponent,
    NameCardComponent,
    NFTCollectionComponent,
    LoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatRippleModule, 
    MatTooltipModule
    MaterialModule
  ],
  exports: [
    NFTCardComponent,
    SearchNavbarComponent,
    InfoFooterComponent,
    MagicCardCaruselComponent,
    HeroNFTComponent,
    NameCardComponent,
    NFTCollectionComponent,
    LoadingOverlayComponent
  ]
})

export class SharedClassicModule { }
