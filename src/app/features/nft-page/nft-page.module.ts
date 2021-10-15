import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedClassicModule } from "src/app/shared/shared-classic.module";
import { NFTPageComponent } from "./nft-page.component";
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    SharedClassicModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatIconModule],
  declarations: [NFTPageComponent],
  exports: [NFTPageComponent]
})

export class NFTPageModule { }
