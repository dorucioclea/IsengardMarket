import BigNumber from "bignumber.js";
import { Component, OnInit } from '@angular/core';
import { Account, Address, Balance, ChainID, ExtensionProvider, GasLimit, I32Value, Interaction, NetworkConfig, Nonce, ProxyProvider, SmartContract, SmartContractAbi, TokenIdentifierValue, Transaction, TransactionPayload, U64Value } from '@elrondnetwork/erdjs/out';
import { loadAbiRegistry } from '@elrondnetwork/erdjs/out/testutils';
import { environment } from '@isengard/env/environment';
import { Economics } from 'src/app/core/models/economics.model';
import { CoreService } from 'src/app/core/services/core.service';
import { SnackbarService } from "src/app/core/services/snackbar.service";
import { ActivatedRoute } from "@angular/router";
import { CryptoService } from "src/app/core/services/crypto.service";

export interface PresaleData {
  sold: number;
  goal: number;
  start: Date;
  end: Date;
}
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  private gatewayUrl = environment.gatewayUri;
  private contractAddress = environment.contractAddress;
  private tokenContractAddress = environment.tokenContractAddress
  private chainId = environment.chainID
  private marketUrl = environment.marketUrl;
  private extProvider: ExtensionProvider;
  private provider: ProxyProvider;
  private nftIdentifier: string | undefined;
  public economics: Economics | undefined;
  public refferer: string | undefined;

  public sale1Sold: number = 0;
  public sale1Goal: number = 2500000;
  public sale1Start: Date = new Date();
  public sale1End: Date = new Date();
  public sale2Sold: number = 0;
  public sale2Goal: number = 10000000;
  public sale3Sold: number = 0;
  public sale3Goal: number = 20000000;

  public presale1: PresaleData | undefined;
  public presale2: PresaleData | undefined;
  public presale3: PresaleData | undefined;

  public email: string | undefined = undefined;
  public isetCount: number = 10;

  ietValue1 = 0.0001;
  maxisetCount1 = 40000;
  maxisetCount2 = 80000;
  maxisetCount3 = 160000;
  ietValue2 = 0.0002;
  ietValue3 = 0.0004;
  constructor(private coreService: CoreService,
    private activatedRoute: ActivatedRoute,
    private cryptoService: CryptoService,
    private snackbarService: SnackbarService) {
    this.extProvider = ExtensionProvider.getInstance();
    this.provider = new ProxyProvider(this.gatewayUrl);

    this.activatedRoute.queryParams.subscribe(qp => {
      this.refferer = qp.reffer;
    });
  }

  async ngOnInit(): Promise<void> {
    this.loadEconomics();
    this.loadExtensionProvider();
    await this.loadAbi();
  }

  public async subscribe() {
    if (this.email == undefined) {
      alert("Please provide a valid email");
      return;
    }
    const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'i');
    if (regex.test(this.email)) {
      this.coreService.addSubscriberEmail(this.email).subscribe(data => {
        alert("Email successfully registered");
      },
        (response) => {
          alert("Email already registered");
          console.error(response.error);
        })
    } else {
      alert("Please provide a valid email");
    }
  }

  public async refferFriend() {
    let provider = ExtensionProvider.getInstance();
    await provider.init();
    let user = await this.syncUser();
    this.snackbarService.positiveSentiment(`Copy and share this url: \r\n \n\n ${this.marketUrl}/landing?reffer=${user.address}`);
  }

  public async buyToken(refferer: string | undefined = undefined) {

    if(this.presale1!.start < new Date()){
      this.snackbarService.negativeSentiment("The sale has not started.")
      return;
    }
    
    let provider = ExtensionProvider.getInstance();
    await provider.init();

    let user = await this.syncUser();

    if (refferer == undefined) {
      let tx = new Transaction({
        sender: new Address(user.address),
        receiver: new Address(this.tokenContractAddress),
        value: Balance.egld(this.egldValue(this.isetCount)),
        gasLimit: new GasLimit(500000000),
        chainID: new ChainID(this.chainId),
        data: new TransactionPayload("buy_presale1"),
      });

      tx.setNonce(user.nonce);

      let signedTransaction = await this.extProvider.signTransaction(tx);
      await signedTransaction.send(this.provider);
      await signedTransaction.awaitExecuted(this.provider);

    } else {
      let payload = this.generateBuyPresaleMessage();
      let tx = new Transaction({
        sender: new Address(user.address),
        receiver: new Address(this.tokenContractAddress),
        value: Balance.egld(this.egldValue(this.isetCount)),
        gasLimit: new GasLimit(500000000),
        chainID: new ChainID(this.chainId),
        data: new TransactionPayload(payload),
      });

      tx.setNonce(user.nonce);

      let signedTransaction = await this.extProvider.signTransaction(tx);
      await signedTransaction.send(this.provider);
      await signedTransaction.awaitExecuted(this.provider);
    }
  }

  public async buyTokenWithReffer() {
    this.buyToken(this.refferer);
  }

  public egldValue(ietCount: number) {
    return this.ietValue1 * ietCount;
  }

  public calculatePercent(presale: PresaleData | undefined){
    if(presale!= undefined){
      return presale.sold/presale.goal;
    }
    return 0;
  }

  private generateBuyPresaleMessage() {
    let address = new Address(this.refferer); // Collection in hex
    let presaleMsg = `buy_presale1_reffered@${address.hex()}`;

    return presaleMsg;
  }

  private async loadEconomics() {
    this.economics = await this.coreService.getEconomics()
  }

  private async loadExtensionProvider() {
    await NetworkConfig.getDefault().sync(this.provider);
    await this.extProvider.init();
  }

  private async loadAbi() {
    let abiRegistry = await loadAbiRegistry(["assets/abi/isengard-token-sale.abi.json"]);
    let abi = new SmartContractAbi(abiRegistry, ["TokenSale"]);
    let contract = new SmartContract({ address: new Address(this.tokenContractAddress), abi: abi });

    this.presale1 = await this.loadPresaleData(contract, new I32Value(1));
    this.presale2 = await this.loadPresaleData(contract, new I32Value(2));
    this.presale3 = await this.loadPresaleData(contract, new I32Value(3));
  }

  private async loadPresaleData(contract: SmartContract, presaleNumber: I32Value) : Promise<PresaleData | undefined> {
    let presaleInteraction = <Interaction>contract.methods.getPresale([presaleNumber]).withGasLimit(new GasLimit(6000000));

    let query = presaleInteraction.buildQuery()
    let response = await this.provider.queryContract(query);
    if (response.isSuccess()) {
      let parsedResponse = presaleInteraction.interpretQueryResponse(response);

      let result: PresaleData = {
        end : new Date(parsedResponse.values[0].valueOf().end_time.toNumber() * 1000),
        start : new Date(parsedResponse.values[0].valueOf().start_time.toNumber() * 1000),
        sold : this.nominatePrice(parsedResponse.values[0].valueOf().sold_tokens.toNumber()),
        goal : this.nominatePrice(parsedResponse.values[0].valueOf().max_tokens.toNumber())
      };

      return result;

    }else{
      return undefined;
    }
  }

  private async syncUser(): Promise<Account> {
    let walletAddress = await this.extProvider.login();
    let address = new Address(walletAddress);
    let user = new Account(address);
    await user.sync(this.provider);

    return user;
  }

  private nominatePrice(price: number): number {
    return price / 1000000;
  }

  private nominatePriceFull(price: number): number {
    return price / 1000000000000;
    // 18 zeros (EGLD Denomination) - 6 zeros (Isengard Denomination)
  }


}
