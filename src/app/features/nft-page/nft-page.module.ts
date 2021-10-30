import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedClassicModule } from "src/app/shared/shared-classic.module";
import { NFTPageComponent } from "./nft-page.component";
import { RouterModule } from "@angular/router";
import { NftSellDialog } from "./dialogs/nft-sell-dialog.component";
import { FormsModule } from '@angular/forms';
import { NftAuctionDialog } from "./dialogs/nft-auction-dialog.component";
import { BidAuctionDialog } from "./dialogs/bid-auction-dialog.component";
import { MaterialModule } from "@isengard/shared/material-module/material-shared.module";

@NgModule({
  imports: [
    SharedClassicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    NFTPageComponent,
    NftSellDialog,
    NftAuctionDialog,
    BidAuctionDialog
  ],
  exports: [NFTPageComponent]
})

export class NFTPageModule { }
