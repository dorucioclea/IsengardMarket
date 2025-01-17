import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NFTCollection } from '../models/nft-collection.model';
import { Observable, of } from 'rxjs';
import { NFT } from '../models/nft.model';
import { environment } from 'src/environments/environment';
import { Economics } from '../models/economics.model';
import { NFTCollectionMOCK } from '../mock-data/mock-data';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private apiUrl = environment.backendUri;
  private elrondUrl = environment.elrondApiUri

  constructor(private http: HttpClient) { }
  // DELETE THIS when it worrks properly
  public getAllCollectionsFake(): Observable<NFTCollection[]> {
    return of(NFTCollectionMOCK).pipe(delay(430));
  }
  public getAllCollections(): Observable<NFTCollection[]> {
    return this.http.get<NFTCollection[]>(this.elrondUrl + '/collections');
  }

  public getAllNFTS(): Observable<NFT[]> {
    return this.http.get<NFT[]>(this.elrondUrl + '/nfts?type=NonFungibleESDT')
  }

  async getEconomics(): Promise<Economics> {
    return this.http.get<Economics>(this.elrondUrl + '/economics').toPromise();
  }

  async addSubscriberEmailAsync(email: string): Promise<void> {
    return this.http.post<void>(this.apiUrl + '/subscribe?email=' + email, '').toPromise();
  }

  addSubscriberEmail(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/subscribe?email=' + email, '')
  }
}
