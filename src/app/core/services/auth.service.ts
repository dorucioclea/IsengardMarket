import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { environment } from '@isengard/env/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentProfileSubject: BehaviorSubject<Profile | undefined> | undefined;
  private maintenanceMode = environment.maintenance;
  
  constructor(private profileService: ProfileService, private router: Router) {
    var storageData = localStorage.getItem('profile');
    if (storageData != null) {
      this.currentProfileSubject = new BehaviorSubject<Profile | undefined>(JSON.parse(storageData));
    } else {
      this.currentProfileSubject = undefined;
    }
  }

  public inMaintenance() {
    return this.maintenanceMode;
  }

  public async login(walletId: string, signatureHex: string) {
    let authResponse = await this.profileService.loginAsync(walletId, signatureHex); // To be used for authenticated calls.
    if (authResponse == null)
      return;

    let profile = await this.profileService.getProfileAsync(authResponse.username);
    this.currentProfileSubject = new BehaviorSubject<Profile | undefined>(profile);

    // Store user data
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('token', JSON.stringify(authResponse.token));

    // Navigate after login
    this.router.navigate(['/artist', profile.username]);
  }

  public logout() {
    if (this.currentProfileSubject == undefined) {
    } else {
      this.currentProfileSubject.next(undefined);
    }
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return this.currentProfileValue ? true : false;
  }

  public get currentProfileValue(): Profile | undefined {
    if (this.currentProfileSubject != undefined)
      return this.currentProfileSubject.value;
    else
      return undefined;
  }

  public updateProfile(profile: Profile) {
    if (this.currentProfileSubject != undefined) {
      this.currentProfileSubject.next(profile);
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }
}
