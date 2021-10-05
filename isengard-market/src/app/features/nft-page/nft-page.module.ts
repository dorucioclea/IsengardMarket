import { NgModule } from "@angular/core";
import { SharedClassicModule } from "src/app/shared/shared-classic.module";
import { NFTPageComponent } from "./nft-page.component";

@NgModule({
  imports: [SharedClassicModule],
  declarations: [NFTPageComponent],
  exports: [NFTPageComponent]
})

export class NFTPageModule { }
