import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NFTCollection } from '../models/nft-collection.model';
import { Observable } from 'rxjs';
import { NFT } from '../models/nft.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  public getAllCollections(): Observable<NFTCollection[]> {
    return this.http.get<NFTCollection[]>('https://testnet-api.elrond.com./collections');
  }

  public getAllNFTS(): Observable<NFT[]> {
    return this.http.get<NFT[]>('https://testnet-api.elrond.com./nfts?type=NonFungibleESDT')
  }
}
