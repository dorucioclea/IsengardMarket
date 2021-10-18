import BigNumber from "bignumber.js";
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Account, Address, Balance, ExtensionProvider, GasLimit, Interaction, NetworkConfig, ProxyProvider, SmartContract, SmartContractAbi, TokenIdentifierValue, Transaction, TransactionPayload, U64Value } from '@elrondnetwork/erdjs/out';
import { environment } from '@isengard/env/environment';
import { Collection } from 'src/app/core/models/collection.model';
import { NFT } from 'src/app/core/models/nft.model';
import { Profile } from 'src/app/core/models/profile';
import { NftService } from 'src/app/core/services/nft.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NftSellDialog } from './dialogs/nft-sell-dialog.component';
import { loadAbiRegistry } from '@elrondnetwork/erdjs/out/testutils';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { ExtendedTransaction } from 'src/app/core/models/transaction.model';
import { Economics } from 'src/app/core/models/economics.model';
import { CoreService } from 'src/app/core/services/core.service';

export enum NftState{
  Default,
  MintedAuction,
  MintedForSale,
  MintedNotForSale,
  NotMintedAuction,
  NotMintedForSale,
  NotMintedNotForSale,
}

@Component({
  selector: 'app-nft-page',
  templateUrl: './nft-page.component.html',
  styleUrls: ['./nft-page.component.scss']
})
export class NFTPageComponent implements OnInit {
  private gatewayUrl = environment.gatewayUri;
  private contractAddress = environment.contractAddress;
  private extProvider: ExtensionProvider;
  private provider: ProxyProvider;
  private nftIdentifier: string | undefined;

  private readonly GAS_LIMIT = 10000000;

  public owner: Profile | undefined;
  public ownerUsername: string | undefined;
  public creator: Profile | undefined;
  public creatorUsername: string | undefined;
  public collection: Collection | undefined;
  public nft: NFT | undefined;

  public price: number | undefined;
  public nftTransactions: ExtendedTransaction[] = [];

  public economics: Economics | undefined;
  public state : NftState = NftState.Default;

  constructor(
    private nftService: NftService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private coreService: CoreService,
    private transactionService: TransactionService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.nftIdentifier = params['nftAddress'];
    });

    this.extProvider = ExtensionProvider.getInstance();
    this.provider = new ProxyProvider(this.gatewayUrl);
  }

  async ngOnInit(): Promise<void> {

    this.loadExtensionProvider();
    this.loadEconomics();

    if (this.nftIdentifier != undefined) {
      await this.loadNftData();
      await this.computeNftState();
      await this.loadCollectionData();
      await this.loadNftSaleData();
      await this.loadTransactions();
    }
  }

  private async computeNftState(){

    await this.loadNftState();
    //this.state = NftState.MintedForSale;
  }

  async openSellNft(): Promise<void> {
    const dialogRef = this.dialog.open(NftSellDialog, {
      width: '500px',
      data: {
        nft: this.nft,
        price: 0
      }
    });

    await dialogRef.afterClosed().subscribe(async result => {
      if (result != null) {
        await this.sellNft(result.price);
      } else {
        this.snackbarService.negativeSentiment('Maybe some other time <3');
      }
    });
  }

  async cancelSale(): Promise<void> {
    let user = await this.syncUser();

    if (this.nft != undefined) {
      let nonce = this.nft?.nonce;
      let nftSaleMessage = this.generateCancelSaleMessageData(this.nft?.collection, this.nft?.nonce);

      let tx = this.generateNewTransaction(nftSaleMessage, this.GAS_LIMIT, 0, this.contractAddress)

      tx.setNonce(user.nonce);
      let signedTransaction = await this.extProvider.signTransaction(tx);

      await signedTransaction.send(this.provider);
    }
  }

  async buyItem(): Promise<void> {
    let user = await this.syncUser();

    if (this.nft != undefined) {
      let nftBuyMessage = this.generateBuyItemMessageData(this.nft?.collection, this.nft?.nonce);
      if (this.price != undefined) {
        let tx = this.generateNewTransaction(nftBuyMessage, this.GAS_LIMIT, this.price, this.contractAddress);
        tx.setNonce(user.nonce);

        let signedTransaction = await this.extProvider.signTransaction(tx);
        await signedTransaction.send(this.provider);
        await signedTransaction.awaitExecuted(this.provider);
        alert('Transaction executed');
      }
    }
  }

  private async loadNftData() {
    if (this.nftIdentifier != undefined) {
      this.nft = await this.nftService.getNftAsync(this.nftIdentifier);

      this.creator = await this.profileService.getProfileAsync(this.nft.creator);
      this.creatorUsername = this.nft.creator;
      if (this.creator != undefined) {
        this.creatorUsername = this.creator.username
      }

      this.ownerUsername = this.nft.owner;
      this.owner = await this.profileService.getProfileAsync(this.nft.owner)
      if (this.owner != undefined) {
        this.ownerUsername = this.owner.username
      }
    }
  }

  private async loadEconomics() {
    this.economics = await this.coreService.getEconomics()
  }

  private async loadExtensionProvider() {
    await NetworkConfig.getDefault().sync(this.provider);
    await this.extProvider.init();
  }

  private async loadTransactions() {
    if (this.nft != undefined)
      /// Create a method that decodes the data and separates the params by @ and see what function was called.
      this.nftTransactions =
        (await this.transactionService.getTokenTransactions(this.nft?.identifier))
          .map(x => { x.value = this.nominatePrice(parseInt(x.value)).toString(); return x; })
          .map(y => new ExtendedTransaction(y))
          .map(y => {
            if (y.data.includes("Y2FuY2VsX3NhbGV")) {//cancel sale
              y.message = "Sale cancelled by";
            } else if (y.data.includes("RVNEVE5GVFRyYW5zZmVyQ")) {
              y.message = "Placed on sale by ";
            }
            else if (y.data.includes("YnV5X25mdF9mcm9tX3NhbGV")) {
              y.message = "Bought by ";
            }
            else if (y.data.includes("RVNEVE5GVENyZWF0ZU")) {
              y.message = "Minted by ";
            }
            return y;
          })
          .filter(x => !x.data.includes("RVNEVE5GVFRyYW5zZmVyQ")).filter(x => !x.data.includes("Y2FuY2VsX3NhbGV"))

    this.nftTransactions.map(async x => {
      let profile = await this.profileService.getProfileAsync(x.sender);
      x.sender = profile.username!;
      return x;
    })
  }

  private async loadCollectionData() {
    if (this.nft != undefined)
      this.collection = await this.nftService.getCollectionAsync(this.nft.collection);
  }

  private async loadNftState() : Promise<NftState>{
    if (this.nft == undefined) {
      return NftState.Default;
    }else{
      let abiRegistry = await loadAbiRegistry(["assets/abi/isengard.abi.json"]);
      let abi = new SmartContractAbi(abiRegistry, ["Isengard"]);
      let contract = new SmartContract({ address: new Address(this.contractAddress), abi: abi });

      let nonce = new U64Value(new BigNumber(this.nft?.nonce));
      let collection = new TokenIdentifierValue(Buffer.from(this.nft?.collection, 'ascii'));

      let testInteraction = <Interaction>contract.methods.getNftState([collection, nonce]).withGasLimit(new GasLimit(this.GAS_LIMIT));

      let query = testInteraction.buildQuery()
      let response = await this.provider.queryContract(query);
      
      if (response.isSuccess()) {
        let parsedResponse = testInteraction.interpretQueryResponse(response);
        console.log(parsedResponse);
        if(parsedResponse.values[0].valueOf() == 'Sale'){
          console.log('this nft is minted and for sale')
          return NftState.MintedForSale;
        }
        if(parsedResponse.values[0].valueOf() == 'Auction'){
          console.log('this nft is minted and for auction')
          return NftState.MintedAuction;
        }
      }
      return NftState.Default;
    }
  }

  private async loadNftSaleData() {
    if (this.nft != undefined) {
      let abiRegistry = await loadAbiRegistry(["assets/abi/isengard.abi.json"]);
      let abi = new SmartContractAbi(abiRegistry, ["Isengard"]);
      let contract = new SmartContract({ address: new Address(this.contractAddress), abi: abi });

      let nonce = new U64Value(new BigNumber(this.nft?.nonce));
      let collection = new TokenIdentifierValue(Buffer.from(this.nft?.collection, 'ascii'));

      let testInteraction = <Interaction>contract.methods.getSale([collection, nonce]).withGasLimit(new GasLimit(this.GAS_LIMIT));

      let query = testInteraction.buildQuery()
      let response = await this.provider.queryContract(query);

      if (response.isSuccess()) {
        let parsedResponse = testInteraction.interpretQueryResponse(response);
        this.price = this.nominatePrice(parsedResponse.values[0].valueOf().price.toNumber());
      }
    }
  }

  private async sellNft(price: number): Promise<void> {
    let user = await this.syncUser();

    if (this.nft != undefined) {
      let nftSaleMessage = this.generateSellNftMessageData(this.nft?.collection, this.nft?.nonce, price)
      let tx = this.generateNewTransaction(nftSaleMessage, this.GAS_LIMIT, 0, user.address.bech32())
      tx.setNonce(user.nonce);

      let signedTransaction = await this.extProvider.signTransaction(tx);
      await signedTransaction.send(this.provider);
      await signedTransaction.awaitExecuted(this.provider);
      alert('Transaction executed');
    }
  }

  private generateCancelSaleMessageData(collection: string, nonce: number): string {
    let collectionHex = this.ascii_to_hex(collection);
    let nonceHex = nonce.toString(16)
    if (nonceHex.length == 1) {
      nonceHex = "0" + nonceHex;
    }

    let nftSaleMessage = `cancel_sale@${collectionHex}@${nonceHex}`;

    return nftSaleMessage;
  }

  private generateSellNftMessageData(collection: string, nonce: number, price: number): string {
    let nonceHex = nonce.toString(16)
    if (nonceHex.length == 1) {
      nonceHex = "0" + nonceHex;
    }

    let priceHex = this.denominatePrice(price).toString(16).toUpperCase();

    let collectionHex = this.ascii_to_hex(collection);
    let contractAddressBech32 = new Address(this.contractAddress).hex();
    let fnameHex = this.ascii_to_hex("add_nft_for_sale").toUpperCase();
    let countHex = "01"; // 1 in hex

    let nftSaleMessage = `ESDTNFTTransfer@${collectionHex}@${nonceHex}@${countHex}@${contractAddressBech32}@${fnameHex}@${priceHex}`;

    return nftSaleMessage;
  }

  private generateBuyItemMessageData(collection: string, nonce: number): string {
    let collectionHex = this.ascii_to_hex(collection); // Collection in hex
    let nonceHex = nonce.toString(16); // Nonce in hex number
    if (nonceHex.length == 1) {
      nonceHex = "0" + nonceHex;
    }

    let nftSaleMessage = `buy_nft_from_sale@${collectionHex}@${nonceHex}`;

    return nftSaleMessage;
  }

  private async syncUser(): Promise<Account> {
    let walletAddress = await this.extProvider.login();
    let address = new Address(walletAddress);
    let user = new Account(address);
    await user.sync(this.provider);

    return user;
  }

  private generateNewTransaction(payload: string, gasLimit: number, value: number, address: string) {
    return new Transaction({
      data: new TransactionPayload(payload),
      gasLimit: new GasLimit(gasLimit),
      receiver: new Address(address),
      value: Balance.egld(value)
    });
  }

  private denominatePrice(price: number): number {
    return price * 1000000000000000000;
  }

  private nominatePrice(price: number): number {
    return price / 1000000000000000000;
  }

  private ascii_to_hex(str: string) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }
}
