import BigNumber from "bignumber.js";
import { Component, OnInit } from '@angular/core';
import { Account, Address, Balance, ChainID, ExtensionProvider, GasLimit, I32Value, Interaction, NetworkConfig, Nonce, ProxyProvider, SmartContract, SmartContractAbi, TokenIdentifierValue, Transaction, TransactionPayload, U64Value } from '@elrondnetwork/erdjs/out';
import { loadAbiRegistry } from '@elrondnetwork/erdjs/out/testutils';
import { environment } from '@isengard/env/environment';
import { Economics } from 'src/app/core/models/economics.model';
import { CoreService } from 'src/app/core/services/core.service';
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  private privateSale = false;
  private gatewayUrl = environment.gatewayUri;
  private contractAddress = environment.contractAddress;
  private tokenContractAddress = environment.tokenContractAddress
  private extProvider: ExtensionProvider;
  private provider: ProxyProvider;
  private nftIdentifier: string | undefined;
  public economics: Economics | undefined;

  public sale1Sold: number =0;
  public sale1Goal: number =2500000;
  public sale2Sold: number =0;
  public sale2Goal: number =10000000;
  public sale3Sold: number =0;
  public sale3Goal: number =20000000;

  public email: string | undefined = undefined;
  public ietCount: number = 100;

  ietValue1 = 0.0001;
  maxIetCount1 = 40000;
  maxIetCount2 = 80000;
  maxIetCount3 = 160000;
  ietValue2 = 0.0002;
  ietValue3 = 0.0004;
  constructor(private coreService: CoreService) {
    this.extProvider = ExtensionProvider.getInstance();
    this.provider = new ProxyProvider(this.gatewayUrl);
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
    if (this.privateSale) {
      return;
    }

    let provider = ExtensionProvider.getInstance();
    await provider.init();
    let user = await this.syncUser();
    alert("refferer/" + user.address);


  }

  public async buyToken() {
    if (this.privateSale) {
      return;
    }
    let provider = ExtensionProvider.getInstance();
    await provider.init();

    let user = await this.syncUser();

    let tx = new Transaction({
      sender: new Address(user.address),
      receiver: new Address(this.tokenContractAddress),
      value: Balance.egld(this.egldValue(this.ietCount)),
      gasLimit: new GasLimit(500000000),
      chainID: new ChainID("D"), // cham
      data: new TransactionPayload("buy_presale1"),
    });
    tx.setNonce(user.nonce);

    let signedTransaction = await this.extProvider.signTransaction(tx);
    await signedTransaction.send(this.provider);
    await signedTransaction.awaitExecuted(this.provider);
  }

  public egldValue(ietCount: number) {
    return this.ietValue1 * ietCount;
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

    let nonce = new I32Value(1);
    let presale1Interaction = <Interaction>contract.methods.getPresale([nonce]).withGasLimit(new GasLimit(6000000));

    let query = presale1Interaction.buildQuery()
    let response = await this.provider.queryContract(query);
    console.log(response);
    if (response.isSuccess()) {
      let parsedResponse = presale1Interaction.interpretQueryResponse(response);
      console.log("PRESALE ENDS:");
      console.log(new Date(parsedResponse.values[0].valueOf().end_time.toNumber()));
      console.log("PRESALE Maximum Tokens:");
      console.log(this.nominatePrice(parsedResponse.values[0].valueOf().max_tokens.toNumber()));
      console.log("PRESALE PRICE:");
      console.log(this.nominatePriceFull(parsedResponse.values[0].valueOf().price.toNumber()));
      console.log("SOLD TOKENS:");
      console.log(this.nominatePrice(parsedResponse.values[0].valueOf().sold_tokens.toNumber()));
      console.log("PRESALE STARTED:");
      console.log(new Date(parsedResponse.values[0].valueOf().start_time.toNumber()));

      this.sale1Sold = this.nominatePrice(parsedResponse.values[0].valueOf().sold_tokens.toNumber());
      this.sale1Goal = this.nominatePrice(parsedResponse.values[0].valueOf().max_tokens.toNumber());
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
