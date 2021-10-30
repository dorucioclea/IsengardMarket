import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NFT } from "src/app/core/models/nft.model";

export interface DialogData {
  nft: NFT;
  price: number;
}

@Component({
  selector: 'nft-sell-dialog',
  templateUrl: 'nft-sell-dialog.component.html',
})
export class NftSellDialog {
  constructor(
    public dialogRef: MatDialogRef<NftSellDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.data);
  }
}
