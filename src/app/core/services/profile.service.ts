import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.backendUri;

  constructor(private http: HttpClient) {
  }

  public getProfile(wallet: string): Observable<Profile> {
    console.log("call is done for wallet  " + wallet);
    return this.http.get<Profile>(this.apiUrl + '/profiles/' + wallet);
  }

  public addProfile(profile: Profile): Observable<any> {
    return this.http.post(this.apiUrl + '/profiles', profile);
  }
}
