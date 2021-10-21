import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment';
import { IsengardNFT, NFT } from '../models/nft.model';
import { Collection } from '../models/collection.model';

@Injectable({
  providedIn: 'root'
})
export class NftService {
  private apiUrl = environment.backendUri;
  private elrondApiUrl = environment.elrondApiUri;

  constructor(private http: HttpClient) {
  }

  public getNft(identifier: string): Observable<IsengardNFT> {
    return this.http.get<IsengardNFT>(this.elrondApiUrl + '/nfts/' + identifier);
  }

  async getNftAsync(identifier: string): Promise<IsengardNFT> {
    return this.http.get<IsengardNFT>(this.elrondApiUrl + '/nfts/' + identifier).toPromise();
  }

  async addNftAsync(nft: FormData) {
    return this.http.post(this.apiUrl + '/nfts', nft).toPromise()
  }

  async getBidAuctionTransactions(collection: string, nonce: number): Promise<any[]> {
    const searchCondition = this.getSearchConditions(collection, nonce);
    return this.http.get<any[]>(this.elrondApiUrl + '/transactions?search=' + searchCondition).toPromise();
  }

  async getNFTsByCreatorAsync(wallet: string, size: number = 50): Promise<NFT[]> {
    return this.http.get<NFT[]>(this.elrondApiUrl + '/nfts?creator=' + wallet + '&size=' + size).toPromise();
  }

  async getOwnedNFTsAsync(wallet: string, size: number = 50, startingFrom: number = 0): Promise<NFT[]> {
    return this.http.get<NFT[]>(this.elrondApiUrl + '/accounts/' + wallet + '/nfts?size=' + size + '&from=' + startingFrom).toPromise();
  }

  async getOwnedNFTsCountAsync(wallet: string): Promise<number> {
    return this.http.get<number>(this.elrondApiUrl + '/accounts/' + wallet + '/nfts/count').toPromise();
  }

  async getCollectionAsync(collection: string): Promise<Collection> {
    return this.http.get<Collection>(this.elrondApiUrl + '/collections/' + collection).toPromise();
  }

  async getNFTsInCollectionAsync(collection: string, size: number = 50): Promise<NFT[]> {
    return this.http.get<NFT[]>(this.elrondApiUrl + '/nfts?collection=' + collection + '&size=' + size).toPromise();
  }

  private getSearchConditions(collection: string, nonce: number) {
    let size = nonce.toString().length;
    if (size == 1) size++;

    let hexIdentifier = this.ascii_to_hex(collection);
    let hexNonce = parseInt(nonce.toString(), 10).toString(16);
    hexNonce = hexNonce.padStart(size, "0");

    return btoa('bid@' + hexIdentifier + '@' + hexNonce);
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