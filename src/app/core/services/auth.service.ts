import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentProfileSubject: BehaviorSubject<Profile | undefined> | undefined;

  constructor(private profileService: ProfileService, private router: Router) {
    var storageData = localStorage.getItem('profile');
    if (storageData != null) {
      this.currentProfileSubject = new BehaviorSubject<Profile | undefined>(JSON.parse(storageData));
    } else {
      this.currentProfileSubject = undefined;
    }
  }

  public async login(walletId: string) {
    let token = await this.profileService.loginAsync(walletId); // To be used for authenticated calls.
    if (token == null)
      return;

    let profile = await this.profileService.getProfileAsync(walletId);
    this.currentProfileSubject = new BehaviorSubject<Profile | undefined>(profile);

    // Store user data
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('token', JSON.stringify(token));

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
}
