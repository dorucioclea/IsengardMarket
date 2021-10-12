import { Component, OnInit } from '@angular/core';
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import { AuthService } from 'src/app/core/services/auth.service';
import "./../../../polyfills";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService) { }

  async ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      let extProvider = ExtensionProvider.getInstance();
      await extProvider.init();
      let connected = await extProvider.isConnected();
      if (connected) {
        let walletAddress = await extProvider.login();
        this.authService.login(walletAddress);
      } else {
        console.error("Something went wrong while connecting to Maiar Wallet");
      }
    }
  }

}
