import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public isLoggedIn: boolean = false;

  public getProfile(wallet: string): Observable<Profile> {
    return this.http.get<Profile>('https://isengardappapidev.azurewebsites.net/profiles/' + wallet);
  }

  public addProfile(profile: Profile): Observable<any> {
    return this.http.post('https://isengardappapidev.azurewebsites.net/profiles/', profile);
  }

  public login(profile: Profile){
    localStorage.setItem('profile',JSON.stringify(profile));
  }

  public loggedIn() : boolean{
    if(!this.isLoggedIn)
      var data = localStorage.getItem('profile')?.toString();
      if(data != null){
        var user:Profile = JSON.parse(data);
        if(user != null){
          return true;
        }
      }
    return false;
  }
}
