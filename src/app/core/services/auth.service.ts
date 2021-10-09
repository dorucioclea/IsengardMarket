import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentProfileSubject: BehaviorSubject<Profile | undefined> | undefined;
  private apiUrl = environment.backendUri;

  constructor(private http: HttpClient, private profileService: ProfileService, private router: Router) {
    var storageData = localStorage.getItem('profile');
    console.log(storageData);
    if (storageData != null) {
      this.currentProfileSubject = new BehaviorSubject<Profile | undefined>(JSON.parse(storageData));
    } else {
      this.currentProfileSubject = undefined;
    }
  }

  public login(walletId: string) {
    return this.http.get<any>(this.apiUrl + '/profiles/' + walletId).subscribe(
      profile => {
        if (profile == null) {
          profile = {
            accountId: walletId,
            username: walletId,
            firstName: undefined,
            lastName: undefined
          };

          this.profileService.addProfile(profile).subscribe(() => {
            if (this.currentProfileSubject == undefined) {
              this.currentProfileSubject = new BehaviorSubject<Profile | undefined>(profile);
            } else {
              console.log(profile);
              this.currentProfileSubject.next(profile);
              console.log(this.currentProfileValue);
            }
          });
        }
        if (this.currentProfileSubject == undefined) {
          console.log("asd2");
          this.currentProfileSubject = new BehaviorSubject<Profile | undefined>(profile);
          console.log(this.currentProfileSubject.value);
        } else {
          console.log("asd3");
          this.currentProfileSubject.next(profile);
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        console.log(profile);
        this.router.navigate(['/artist', profile.username]);
      },
      () => {
        var newProfile: Profile = {
          accountId: walletId,
          username: walletId,
          firstName: undefined,
          lastName: undefined
        };

        this.profileService.addProfile(newProfile).subscribe(() => {
          if (this.currentProfileSubject == undefined) {
            this.currentProfileSubject = new BehaviorSubject<Profile | undefined>(newProfile);
          } else {
            console.log(newProfile);
            this.currentProfileSubject.next(newProfile);
            console.log(this.currentProfileValue);
          }
        });

        localStorage.setItem('profile', JSON.stringify(newProfile));
        console.log("1");
        this.router.navigate(['/artist', newProfile.username]);
      }
    );

  }

  public logout() {
    if (this.currentProfileSubject == undefined) {
      console.log("wtf");
    } else {
      this.currentProfileSubject.next(undefined);
    }
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    console.log(this.currentProfileValue);
    return this.currentProfileValue ? true : false;
  }

  public get currentProfileValue(): Profile | undefined {
    if (this.currentProfileSubject != undefined)
      return this.currentProfileSubject.value;
    else
      return undefined;
  }
}
