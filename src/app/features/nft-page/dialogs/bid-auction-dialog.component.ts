import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NFT } from "src/app/core/models/nft.model";

export interface DialogData {
    nft: NFT;
    bid: number;
}

@Component({
    selector: 'bid-auction-dialog',
    templateUrl: 'bid-auction-dialog.component.html',
})
export class BidAuctionDialog {
    constructor(
        public dialogRef: MatDialogRef<BidAuctionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    onYesClick(): void {
        this.dialogRef.close(this.data);
    }
}