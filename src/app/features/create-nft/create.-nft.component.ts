import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Account, Address, NetworkConfig, ProxyProvider } from '@elrondnetwork/erdjs/out';
import { AuthService } from 'src/app/core/services/auth.service';
import { NftService } from 'src/app/core/services/nft.service';
import { environment } from 'src/environments/environment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-create-nft',
  templateUrl: './create.-nft.component.html',
  styleUrls: ['./create.-nft.component.scss']
})
export class CreateNFTComponent implements OnInit {
  file: string | SafeUrl = "assets/images/add-media.png";
  royalties: number = 1;
  name: string | undefined;
  imagePath: string = '';
  mediaFile: any;
  externalLink: string | undefined;
  description: string | undefined;
  collection: string | undefined;
  url: string = '';
  onBlockchain = false;
  formData = new FormData();
  message: string | undefined;
  selectable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControll = new FormControl();
  tags: string[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private nftService: NftService
  ) {
  }

  addTagFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.tags.push(event.value);
      event.chipInput!.clear();
    }
  }

  remove(keyword: string) {
    const indexOfWordToDelete: number = this.tags.indexOf(keyword);
    if (indexOfWordToDelete == -1) {
      return;
    }
    this.tags.splice(indexOfWordToDelete, 1);
  }


  async ngOnInit(): Promise<void> {
    // Example of getting the transactions of 'bid' in an auction
    var data = await this.nftService.getBidAuctionTransactions("4STICK-fe3198", 1);

    if (this.authService.isLoggedIn()) {
      var walletAddress = this.authService.currentProfileValue?.accountId;
      let provider = new ProxyProvider(environment.gatewayUri);
      await NetworkConfig.getDefault().sync(provider);

      let address = new Address(walletAddress);
      let user = new Account(address);
      await user.sync(provider);

      // Create transaction
      // Sign and send. :) Waiting for Elrond  Developers
    }
  }

  addNFT() {
    this.formData = new FormData();
    let err = [];
    if (this.mediaFile == undefined)
      err.push('No file uploaded.');
    else
      this.formData.append('media', this.mediaFile);

    if (this.name == undefined)
      err.push('A name is required');
    else
      this.formData.append('name', this.name);

    if (this.description == undefined)
      err.push('Please provide a description');
    else
      this.formData.append('description', this.description);

    if (this.royalties == undefined)
      err.push('Royalties have to be between 50 and 10000 (0.5%  to 100%)');
    else
      this.formData.append('royalties', this.royalties.toString());

    if (this.collection == undefined)
      err.push('Please select or create a new collection!');
    else
      this.formData.append('collection', this.collection);

    if (err.length != 0) {
      alert(err);
      throw 'Sry, conditions not met.';
    }

    this.formData.append('tags', JSON.stringify(this.tags));
    this.formData.append('url', JSON.stringify(this.url));
    this.formData.append('onBlockchain', JSON.stringify(this.onBlockchain));

    this.nftService.addNftAsync(this.formData);
  }

  ascii_to_hex(str: string) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  updateImage(ev: any) {
    this.mediaFile = ev.target.files[0];
    this.file = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(ev.target.files[0])
    );
  }
}
