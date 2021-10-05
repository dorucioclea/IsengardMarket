import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistPageHeaderComponent } from './artist-page-header/artist-page-header.component';
import { ArtistPageInfoComponent } from './artist-page-info/artist-page-info.component';
import { ArtistPageComponent } from './artist-page.component';
import { SharedClassicModule } from 'src/app/shared/shared-classic.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    SharedClassicModule,
    ClipboardModule,
    MatIconModule
  ],
  declarations: [ArtistPageComponent, ArtistPageHeaderComponent, ArtistPageInfoComponent],
  exports: [
    ArtistPageComponent, ArtistPageHeaderComponent, ArtistPageInfoComponent
  ]
})
export class ArtistPageModule { }
