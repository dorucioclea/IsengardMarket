import BigNumber from "bignumber.js";
import { Component, OnInit } from '@angular/core';
import { Address, GasLimit, Interaction, ProxyProvider, SmartContract, SmartContractAbi, TokenIdentifierValue, U64Value } from '@elrondnetwork/erdjs/out';
import { loadAbiRegistry } from '@elrondnetwork/erdjs/out/testutils';
import { environment } from '@isengard/env/environment';
import { NFT } from 'src/app/core/models/nft.model';
import { NftService } from 'src/app/core/services/nft.service';

export enum SaleType{
  Sale,
  Auction
}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  private readonly contractAddress = environment.contractAddress;
  private readonly gatewayUrl = environment.gatewayUri;
  private readonly GAS_LIMIT = 60000000;
  private provider: ProxyProvider;
  public activeSales: number = 0;

  public auctions: NFT[] = []; //TODO: Create separate model maybe?
  public sales: NFT[] = []; //TODO: Create separate model maybe?

  constructor(private nftService: NftService) {
    this.provider = new ProxyProvider(this.gatewayUrl);
    
  }

  async ngOnInit(): Promise<void> {
    // Get sales number and initial nfts
    this.activeSales = await this.nftService.getOwnedNFTsCountAsync(this.contractAddress);
    let onSaleNfts = await this.nftService.getOwnedNFTsAsync(this.contractAddress, 50, 0);

    // load abi
    let abiRegistry = await loadAbiRegistry(["assets/abi/isengard.abi.json"]); // TTODO: Extract to service and env variable.
    let abi = new SmartContractAbi(abiRegistry, ["Isengard"]);
    let contract = new SmartContract({ address: new Address(this.contractAddress), abi: abi });

    // Compute type of nft sale and display data. // Maybe create separate types for auction and sale?. Actually sure!
    onSaleNfts.forEach( async nft => {
      let nonce = new U64Value(new BigNumber(nft.nonce));
      let collection = new TokenIdentifierValue(Buffer.from(nft.collection, 'ascii'));
  
      let testInteraction = <Interaction>contract.methods.getWrapper([collection, nonce]).withGasLimit(new GasLimit(this.GAS_LIMIT));
  
      let query = testInteraction.buildQuery()
      let response = await this.provider.queryContract(query);
  
      if (response.isSuccess()) {
        let parsedResponse = testInteraction.interpretQueryResponse(response);
        var auction = parsedResponse.values[0].valueOf().auction; // here is the struct of the auction -> maybe map in separate obj / nullable
        var sale = parsedResponse.values[0].valueOf().sale; // here is the struct of the sale -> maybe map in separate obj / nullable
        var state = parsedResponse.values[0].valueOf().state;
        
        console.log(state);
        console.log(auction);
        console.log(sale);
        if(state == "Sale"){
          this.sales.push(nft)
        }else{
          this.auctions.push(nft);
        }
      }

    })
   

    // Should 
    


    // Load NFTs
    // Flow -> get NFTs of contract -> get new struct for each of those by Id.

     // Implement infinite load with this paginated results :)
    

  }

}
