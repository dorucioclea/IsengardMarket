import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.backendUri;
  private elrondApiUrl = environment.elrondApiUri;

  constructor(private http: HttpClient) {
    
  }

  async getTokenTransactions(token: string): Promise<Transaction[]> {
    return this.http.get<Transaction[]>(this.elrondApiUrl + '/transactions?token=' + token +'&size=100' ).toPromise();
  }

}
