import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NFTCollection } from '../models/nft-collection.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }


  public getAllCollections(): Observable<NFTCollection[]> {
    return this.http.get<NFTCollection[]>('https://testnet-api.elrond.com./collections');
  }
}
