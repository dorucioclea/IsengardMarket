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
    // TODO @razvan: make the url an environment variable
    // TODO @razvan: review profile login and make sure that the data can be securely 
    // sent to the backend without all the redirects initially planned

    if (!this.profileService.isLoggedIn) {
      this.activatedRoute.queryParams.subscribe(params => {
        let address = params['address'];
        if (address === null || address === undefined) {
          window.location.href = 'https://testnet-wallet.elrond.com/hook/login?callbackUrl=http://localhost:4200/login';
        } else {
          this.profileService.getProfile(address).subscribe(profile => {
            // Profile can be null if this is the first time the user logs in.
            // Profile creation occurs.
            if (profile == null) {
              var newProfile: Profile = {
                accountId: address,
                username: address,
                firstName: null,
                lastName: null
              };
              this.profileService.addProfile(newProfile).subscribe();
              this.profileService.login(newProfile);
              this.profile = newProfile;
            } else {
              this.profile = profile;
            }

            // Redirect the logged in user to the profile for now.
            // TODO @razvan: find a way to redirect to the url where the user was when he clicked on login.
            this.router.navigate(['artist', this.profile.username])
          });
        }
      });
    }
  }

}
