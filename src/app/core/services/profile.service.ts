import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.model';

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

  async loginAsync(wallet: string, signature: string): Promise<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + '/auth/login?address=' + wallet + '&signature=' + signature, '').toPromise();
  }

  async getUserSecretNonceAsync(address: string, refferer: string | undefined = undefined) {
    if (refferer != undefined) {
      console.log("MERGE");
      return this.http.get<string>(this.apiUrl + '/auth/login/' + address + '?refferer=' + refferer).toPromise();
    }
    return this.http.get<string>(this.apiUrl + '/auth/login/' + address).toPromise();
  }

  async updateProfileImageAsync(formData: FormData, address: string): Promise<any> {
    return this.http.post<any>(this.apiUrl + '/profiles/' + address + '/profilePhoto', formData).toPromise();
  }

  async updateProfileAsync(profile: Profile, username: string): Promise<any> {
    return this.http.put<any>(this.apiUrl + '/profiles/' + username + '', profile).toPromise();
  }

  async updateCoverImageAsync(formData: FormData, address: string): Promise<any> {
    return this.http.post<any>(this.apiUrl + '/profiles/' + address + '/coverPhoto', formData).toPromise()
  }
}
