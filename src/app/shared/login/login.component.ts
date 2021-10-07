import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/core/models/profile';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private profile: Profile | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    if (!this.profileService.isLoggedIn) {
      this.activatedRoute.queryParams.subscribe(params => {
        let address = params['address'];
        if (address === null || address === undefined) {
          window.location.href = 'https://testnet-wallet.elrond.com/hook/login?callbackUrl=http://localhost:4200/login';
        } else {
          // log the user in
          this.profileService.getProfile(address).subscribe(profile => {
            if (profile == null) {
              var newProfile: Profile = {
                accountId: address,
                username: address,
                firstName: null,
                lastName: null
              };
              this.profileService.addProfile(newProfile);
              this.profileService.login(newProfile);
              this.profile = newProfile;
            } else {
              this.profile = profile;
            }

            this.router.navigate(['profile', this.profile.username])
          });
        }
      });
    }
    //Automatically redirec the user to elrond wallet and use the callback

  }

}
