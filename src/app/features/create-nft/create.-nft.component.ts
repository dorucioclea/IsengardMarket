import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Account, Address, Balance, ExtensionProvider, GasLimit, NetworkConfig, ProxyProvider, Transaction, TransactionPayload } from '@elrondnetwork/erdjs/out';
import { AuthService } from 'src/app/core/services/auth.service';
import { NftService } from 'src/app/core/services/nft.service';
import { environment } from 'src/environments/environment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Collection } from 'src/app/core/models/collection.model';
import * as IPFS from 'ipfs-core'
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-nft',
  templateUrl: './create.-nft.component.html',
  styleUrls: ['./create.-nft.component.scss']
})
export class CreateNFTComponent implements OnInit {

  private readonly gatewayUrl = environment.gatewayUri;
  private readonly contractAddress = environment.contractAddress;
  private extProvider: ExtensionProvider;
  private provider: ProxyProvider;
  private walletAddress: string | undefined;

  private readonly GAS_LIMIT = 20000000;

  public file: string | SafeUrl = "assets/images/add-media.png";
  public royalties: number = 1;
  public name: string | undefined;
  public imagePath: string = '';
  public mediaFile: File | undefined;
  public externalLink: string | undefined;
  public description: string | undefined;
  public collection: string | undefined;
  public url: string = '';
  public onBlockchain = false;
  public formData = new FormData();
  public message: string | undefined;
  public selectable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagControll = new FormControl();
  public tags: string[] = [];

  public userCollections: Collection[] = [];

  private ipfs : any;

  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private nftService: NftService,
    private router: Router
  ) {

    this.extProvider = ExtensionProvider.getInstance();
    this.provider = new ProxyProvider(this.gatewayUrl);
  }

  async ngOnInit(): Promise<void> {
    this.loadExtensionProvider();
    
    // Example of getting the transactions of 'bid' in an auction
    var browsingUser = this.authService.currentProfileValue;
    if (browsingUser?.accountId != undefined) {

      // this should be retrieved from our server, so our server and add stuff on top of normal collections
      // like pictures, links, etc
      this.userCollections = await this.nftService.getUserCollectionsAsync(browsingUser?.accountId);
    }

    //Load IPFS
    this.ipfs = await IPFS.create({repo: 'ok' + Math.random()});


    if (this.authService.isLoggedIn()) {
      var walletAddress = this.authService.currentProfileValue?.accountId;
      this.walletAddress = walletAddress;
      let provider = new ProxyProvider(environment.gatewayUri);
      await NetworkConfig.getDefault().sync(provider);

      let address = new Address(walletAddress);
      let user = new Account(address);
      await user.sync(provider);

      // Create transaction
      // Sign and send. :) Waiting for Elrond  Developers
    }
  }

  private async loadExtensionProvider() {
    await NetworkConfig.getDefault().sync(this.provider);
    await this.extProvider.init();
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

    if (this.onBlockchain) {
      console.log("semnam, facem toate alea, stiti voi, alea ale mele");
      this.createNftAndBroadcast();
    } else {
      this.nftService.addNftAsync(this.formData);
    }
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

  private async syncUser(): Promise<Account> {
    let walletAddress = await this.extProvider.login();
    let address = new Address(walletAddress);
    let user = new Account(address);
    await user.sync(this.provider);

    return user;
  }

  private async createNftAndBroadcast() {
    try {
      if (this.mediaFile != undefined && this.description != undefined) {

        // console.log("IPFS1");

        // let id = await this.IPFSService.getId();
        // console.log(id);
    
        // let version = await this.IPFSService.getVersion();
        // console.log(version);
    
        // let status = await this.IPFSService.getStatus();
        // let computed = status ? 'Online' : 'Offline'
        // console.log(computed);
        
        // let fileCid = await this.IPFSService.addFile(this.mediaFile);
        // console.log(fileCid.toJSON());
        // console.log(fileCid.toString());
        // console.log(fileCid.toV1());
        // console.log(fileCid.toV1().toString());

        console.log("Saving media to IPFS...");
        var ipfsMediaStorageUrl = await this.saveMediaToIPFS(this.mediaFile);
        console.log("Media Saved");
        console.log("Saving json Data to IPFS...");
        var ipfsMetadataStorageIdentifier = await this.saveJsonToIPFS(this.description, this.mediaFile, ipfsMediaStorageUrl);
        console.log("Data saved")
        let user = await this.syncUser();

        let nftCreateMessage = this.generateCreateNftMessage(ipfsMediaStorageUrl, ipfsMetadataStorageIdentifier);
        let tx = this.generateNewTransaction(nftCreateMessage, this.GAS_LIMIT, 0, this.walletAddress!);
        tx.setNonce(user.nonce);

        let signedTransaction = await this.extProvider.signTransaction(tx);
        await signedTransaction.send(this.provider);
        console.log("Executing transaction...");
        await signedTransaction.awaitExecuted(this.provider);

        alert('Transaction executed :)');

        // let watcher = new TransactionWatcher(tx3.hash, provider);
        // await watcher.awaitStatus(status => status.isExecuted());

        this.router.navigate(['/nft', this.collection])
      }
    } catch (ex) {
      alert("Something went wrong, please try again.")
      console.error(ex);
    }
  }

  private async saveMediaToIPFS(mediaFile: File): Promise<string> {
    var mediaBlob = new Blob([mediaFile])
    const { cid } = await this.ipfs.add(mediaBlob);

    return 'https://ipfs.io/ipfs/' + cid;
  }

  private async saveJsonToIPFS(description: string, file: File, fileUri: string): Promise<string> {
    let data = {
      description,
      fileType: file.type,
      fileName: file.name,
      fileUri
    };

    let blobData = new Blob([JSON.stringify(data)])
    const { cid } = await this.ipfs.add(blobData);
    return cid.toString();
  }

  private generateCreateNftMessage(url: string, metadataUrl: string) {
    let collectionHex = this.ascii_to_hex(this.collection!); // Collection in hex
    let nameHex = this.ascii_to_hex(this.name!);
    let royaltiesHex = this.ascii_to_hex_number(this.royalties);
    let hash = this.ascii_to_hex("Hash");

    let attributes = `tags:${this.tags.join()};externalLink:${this.externalLink};metadata:${metadataUrl}`;
    let attributesHex = this.ascii_to_hex(attributes);
    console.log(this.externalLink);
    let urlHex = this.ascii_to_hex(url);

    let createMessage = `ESDTNFTCreate@${collectionHex}@01@${nameHex}@${royaltiesHex}@${hash}@${attributesHex}@${urlHex}`;
    return createMessage;
  }

  private generateNewTransaction(payload: string, gasLimit: number, value: number, address: string) {
    return new Transaction({
      data: new TransactionPayload(payload),
      gasLimit: new GasLimit(gasLimit),
      receiver: new Address(address),
      value: Balance.egld(value)
    });
  }

  updateImage(ev: any) {
    this.mediaFile = ev.target.files[0];
    this.file = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(ev.target.files[0])
    );
  }

  // HELPERS:
  ascii_to_hex(str: string) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  private ascii_to_hex_number(price: number): string { // bag pl in masa.

    let value = price.toString(16);
    if (value.length % 2 == 1) {
      value = "0" + value;
    }

    return value;
  }
}
