import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedClassicModule } from "src/app/shared/shared-classic.module";
import { NFTPageComponent } from "./nft-page.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from "@angular/router";
import { MatDialogModule } from '@angular/material/dialog';
import { NftSellDialog } from "./dialogs/nft-sell-dialog.component";
import { FormsModule } from '@angular/forms';
import { NftAuctionDialog } from "./dialogs/nft-auction-dialog.component";
import { BidAuctionDialog } from "./dialogs/bid-auction-dialog.component";

@NgModule({
  imports: [
    SharedClassicModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    MatIconModule],
  declarations: [NFTPageComponent,
    NftSellDialog,
    NftAuctionDialog,
    BidAuctionDialog],
  exports: [NFTPageComponent]
})

export class NFTPageModule { }
