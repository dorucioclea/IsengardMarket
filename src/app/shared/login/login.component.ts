import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private profile: Profile | null = null;
  private marketUrl = environment.marketUrl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    // TODO @razvan: make the url an environment variable
    // TODO @razvan: review profile login and make sure that the data can be securely 
    // sent to the backend without all the redirects initially planned
    if (!this.authService.isLoggedIn()) {
      this.activatedRoute.queryParams.subscribe(params => {
        let address = params['address'];
        if (address == null) {
          window.location.href = 'https://testnet-wallet.elrond.com/hook/login?callbackUrl=' + this.marketUrl + '/login';
        } else {
          this.authService.login(address);
        }
      });
    } else {
      // TODO : Delete this
      // Use a guard instead of this else.
      this.router.navigate(['home']);
    }
  }
}
