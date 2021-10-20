import { Component, OnInit } from '@angular/core';
import {ExtensionProvider, SignableMessage} from '@elrondnetwork/erdjs/out';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import "./../../../polyfills";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService, private profileService: ProfileService) { }

  async ngOnInit() {
    if (!this.authService.isLoggedIn()) {

      let extProvider = ExtensionProvider.getInstance();
      await extProvider.init();
      let connected = await extProvider.isConnected();
      if (connected) {
        let walletAddress = await extProvider.login();
        let secretMessage = await this.profileService.getUserSecretNonceAsync(walletAddress);

        let message = new SignableMessage({
          message: Buffer.from(secretMessage, 'ascii'),
        });
        
        let signedMessage = await extProvider.signMessage(message);

        console.log(signedMessage.signature.hex());
        this.authService.login(walletAddress, signedMessage.signature.hex());

      } else {
        console.error("Something went wrong while connecting to Maiar Wallet");
      }

    }
  }

}
