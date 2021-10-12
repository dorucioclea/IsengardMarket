import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment';
import { IsengardNFT, NFT } from '../models/nft.model';

@Injectable({
  providedIn: 'root'
})
export class NftService {
  private apiUrl = environment.backendUri;

  constructor(private http: HttpClient) {
  }

  public getNft(identifier: string): Observable<IsengardNFT> {
    return this.http.get<IsengardNFT>(this.apiUrl + '/nfts/' + identifier);
  }

  async getNftAsync(identifier: string): Promise<IsengardNFT> {
    return this.http.get<IsengardNFT>(this.apiUrl + '/nfts/' + identifier).toPromise();
  }
  
  async addNftAsync(nft: FormData){
    return this.http.post(this.apiUrl + '/nfts', nft).toPromise()
  }
}