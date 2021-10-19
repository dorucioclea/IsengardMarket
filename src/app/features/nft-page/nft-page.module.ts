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
import { NftMintedNotForSaleComponent } from "./nft-minted-not-for-sale/nft-minted-not-for-sale.component";
import { NftMintedForSaleComponent } from "./nft-minted-for-sale/nft-minted-for-sale.component";
import { NftNotMintedForSaleComponent } from "./nft-not-minted-for-sale/nft-not-minted-for-sale.component";
import { NftNotMintedNotForSaleComponent } from "./nft-not-minted-not-for-sale/nft-not-minted-not-for-sale.component";
import { NftNotMintedAuctionComponent } from "./nft-not-minted-auction/nft-not-minted-auction.component";
import { NftMintedAuctionComponent } from "./nft-minted-auction/nft-minted-auction.component";
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
    BidAuctionDialog,
    NftMintedNotForSaleComponent,
    NftMintedForSaleComponent,
    NftNotMintedForSaleComponent,
    NftNotMintedNotForSaleComponent,
    NftNotMintedAuctionComponent,
    NftMintedAuctionComponent],
  exports: [NFTPageComponent]
})

export class NFTPageModule { }
