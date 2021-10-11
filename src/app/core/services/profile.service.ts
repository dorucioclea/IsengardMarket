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
    return this.http.get<Profile>(this.apiUrl + '/profiles/' + wallet);
  }

  public addProfile(profile: Profile): Observable<any> {
    return this.http.post(this.apiUrl + '/profiles', profile);
  }

  async getProfileAsync(wallet: string): Promise<Profile> {
    return this.http.get<Profile>(this.apiUrl + '/profiles/' + wallet).toPromise();
  }

  async loginAsync(wallet: string): Promise<string> {
    return this.http.post<string>(this.apiUrl + '/auth/login?address=' + wallet, '').toPromise();
  }
}
