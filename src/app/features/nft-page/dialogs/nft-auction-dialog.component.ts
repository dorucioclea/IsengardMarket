import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NFT } from "src/app/core/models/nft.model";

export interface DialogData {
    nft: NFT;
    starting_price: number;
    final_price:number;
    deadline:number
}

@Component({
    selector: 'nft-auction-dialog',
    templateUrl: 'nft-auction-dialog.component.html',
})
export class NftAuctionDialog {
    constructor(
        public dialogRef: MatDialogRef<NftAuctionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    onYesClick(): void {
        var date = new Date(this.data.deadline).getTime()/1000;
        this.data.deadline = date;
        this.dialogRef.close(this.data);
    }
}