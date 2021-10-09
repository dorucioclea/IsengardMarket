import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedClassicModule } from "src/app/shared/shared-classic.module";
import { NFTPageComponent } from "./nft-page.component";

@NgModule({
  imports: [SharedClassicModule, MatIconModule],
  declarations: [NFTPageComponent],
  exports: [NFTPageComponent]
})

export class NFTPageModule { }
