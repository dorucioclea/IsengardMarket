import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistPageHeaderComponent } from './artist-page-header/artist-page-header.component';
import { ArtistPageInfoComponent } from './artist-page-info/artist-page-info.component';
import { ArtistPageComponent } from './artist-page.component';
import { SharedClassicModule } from 'src/app/shared/shared-classic.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { ArtistPageTopInfoComponent } from './artist-page-top-info/artist-page-top-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedClassicModule,
    ClipboardModule,
    MatIconModule
  ],
  declarations: [ArtistPageComponent, ArtistPageHeaderComponent, ArtistPageInfoComponent, ArtistPageTopInfoComponent],
  exports: [
    ArtistPageComponent, ArtistPageHeaderComponent, ArtistPageInfoComponent, ArtistPageTopInfoComponent
  ]
})
export class ArtistPageModule { }
