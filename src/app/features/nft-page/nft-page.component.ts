import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Address, Balance, ExtensionProvider, GasLimit, NetworkConfig, ProxyProvider, SignableMessage, Transaction, TransactionPayload } from '@elrondnetwork/erdjs/out';
import { Collection } from 'src/app/core/models/collection.model';
import { NFT } from 'src/app/core/models/nft.model';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { NftService } from 'src/app/core/services/nft.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-nft-page',
  templateUrl: './nft-page.component.html',
  styleUrls: ['./nft-page.component.scss']
})
export class NFTPageComponent implements OnInit {

  public nft: NFT | undefined;
  private nftIdentifier: string | undefined;
  public owner: Profile | undefined;
  public ownerUsername: string | undefined;
  public creator: Profile | undefined;
  public creatorUsername: string | undefined;
  public collection: Collection | undefined;

  constructor(
    private nftService: NftService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.nftIdentifier = params['nftAddress'];
    })
  }

  async ngOnInit(): Promise<void> {
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

      this.collection = await this.nftService.getCollectionAsync(this.nft.collection);
      console.log(this.collection);
      console.log(this.nft);

      // Try to parse attributes.
      console.log(atob(this.nft.attributes));
      console.log(JSON.parse(atob(this.nft.attributes)));
    }
  }

  async sellNft(): Promise<void> {
    let provider = new ProxyProvider("https://devnet-gateway.elrond.com");
    await NetworkConfig.getDefault().sync(provider);

    console.log("trying to sell nft");

    let extProvider = ExtensionProvider.getInstance();
    await extProvider.init();

    let walletAddress = await extProvider.login();
    let address = new Address(walletAddress);
    let user = new Account(address);
    await user.sync(provider);
    console.log(user);

    // MUIE ESDTNFTTransfer@34535449434b2d666533313938@01@01@00000000000000000500e586aad80fd63372d117bc51f0620ca58bcda97afb92@6164645f6e66745f666f725f73616c65@2386F26FC10000
    //            ESDTNFTTransfer@41534441534441532d313262643861@3@1@000000000000000005004de06c6a783747444ae9d5049878eac8fecdbc27fb92@6164645F6E66745F666F725F73616C65@2386f26fc10000
    // FARAMUIE   ESDTNFTTransfer@41534441534441532d313262643861@03@01@000000000000000005004de06c6a783747444ae9d5049878eac8fecdbc27fb92@6164645F6E66745F666F725F73616C65@2386F26FC10000
    if (this.nft != undefined) {
      let param1 = this.ascii_to_hex(this.nft?.collection); // Collection in hex
      let count = 1;
      let nonce = this.nft?.nonce;
      let price = 10000000000000000;
      let param2 = nonce.toString(16); // Nonce in hex number
      if (param2.length == 1) {
        param2 = "0" + param2;
      }
      let param3 = count.toString(16); // Count in hex number
      if (param3.length == 1) {
        param3 = "0" + param3;
      }
      let param4 = "000000000000000005004de06c6a783747444ae9d5049878eac8fecdbc27fb92" // contract address bech32 decoded into hex
      let param5 = this.ascii_to_hex("add_nft_for_sale").toUpperCase() // Method in hex
      let param6 = price.toString(16).toUpperCase(); // decimal to hex // 10000000000000000 (0.01 EGLD)

      let nftSaleMessage = `ESDTNFTTransfer@${param1}@${param2}@${param3}@${param4}@${param5}@${param6}`;
      console.log(nftSaleMessage);

      // ESDTNFTTransfer@41534441534441532d313262643861@1@1@000000000000000005004de06c6a783747444ae9d5049878eac8fecdbc27fb92@6164645f6e66745f666f725f73616c65@2386f26fc10000 
      let tx = new Transaction({
        data: new TransactionPayload(nftSaleMessage),
        gasLimit: new GasLimit(70000000),
        receiver: address,
        value: Balance.egld(0)
      });

      tx.setNonce(user.nonce);
      let signedTransaction = await extProvider.signTransaction(tx);

      await signedTransaction.send(provider);
    }
  }

  async cancelSale(): Promise<void> {
    // fn cancel_sale(
    //   &self,
    //   token_id: TokenIdentifier,
    //   nonce: u64

    let provider = new ProxyProvider("https://devnet-gateway.elrond.com");
    await NetworkConfig.getDefault().sync(provider);

    console.log("trying to cancel sale of nft");

    let extProvider = ExtensionProvider.getInstance();
    await extProvider.init();

    let walletAddress = await extProvider.login();
    let address = new Address(walletAddress);
    let user = new Account(address);
    await user.sync(provider);

    if (this.nft != undefined) {
      let count = 1;
      let nonce = this.nft?.nonce;

      let param1 = this.ascii_to_hex(this.nft?.collection); // Collection in hex
      let param2 = nonce.toString(16); // Nonce in hex number
      if (param2.length == 1) {
        param2 = "0" + param2;
      }

      let nftSaleMessage = `cancel_sale@${param1}@${param2}`;
      console.log(nftSaleMessage);

      let tx = new Transaction({
        data: new TransactionPayload(nftSaleMessage),
        gasLimit: new GasLimit(70000000),
        receiver: new Address('erd1qqqqqqqqqqqqqpgqfhsxc6ncxar5gjhf65zfs782erlvm0p8lwfq7y9mq4'),
        value: Balance.egld(0)
      });

      tx.setNonce(user.nonce);
      let signedTransaction = await extProvider.signTransaction(tx);

      await signedTransaction.send(provider);
    }
  }

  async buyItem(): Promise<void> {

    let provider = new ProxyProvider("https://devnet-gateway.elrond.com");
    await NetworkConfig.getDefault().sync(provider);

    console.log("trying to buy nft");

    let extProvider = ExtensionProvider.getInstance();
    await extProvider.init();

    let walletAddress = await extProvider.login();
    let address = new Address(walletAddress);
    let user = new Account(address);
    await user.sync(provider);

    if (this.nft != undefined) {
      let count = 1;
      let price = 10000000000000000;
      let nonce = this.nft?.nonce;

      let param1 = this.ascii_to_hex(this.nft?.collection); // Collection in hex
      let param2 = nonce.toString(16); // Nonce in hex number
      if (param2.length == 1) {
        param2 = "0" + param2;
      }

      let nftSaleMessage = `buy_nft_from_sale@${param1}@${param2}`;

      let tx = new Transaction({
        data: new TransactionPayload(nftSaleMessage),
        gasLimit: new GasLimit(70000000),
        receiver: new Address('erd1qqqqqqqqqqqqqpgqfhsxc6ncxar5gjhf65zfs782erlvm0p8lwfq7y9mq4'),
        value: Balance.egld(0.01)
      });

      tx.setNonce(user.nonce);
      let signedTransaction = await extProvider.signTransaction(tx);

      await signedTransaction.send(provider);
    }
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
