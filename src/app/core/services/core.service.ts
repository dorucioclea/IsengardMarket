import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NFTCollection } from '../models/nft-collection.model';
import { Observable } from 'rxjs';
import { NFT } from '../models/nft.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private apiUrl = environment.backendUri;
  private elrondUrl = environment.elrondApiUri

  constructor(private http: HttpClient) { }

  public getAllCollections(): Observable<NFTCollection[]> {
    return this.http.get<NFTCollection[]>(this.elrondUrl+'/collections');
  }

  public getAllNFTS(): Observable<NFT[]> {
    return this.http.get<NFT[]>(this.elrondUrl+'/nfts?type=NonFungibleESDT')
  }
}
