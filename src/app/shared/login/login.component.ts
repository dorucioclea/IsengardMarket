import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtensionProvider, SignableMessage, WalletProvider, WalletConnectProvider, ProxyProvider } from '@elrondnetwork/erdjs/out';
import { environment } from '@isengard/env/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import "./../../../polyfills";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly bridgeAddress = 'https://bridge.walletconnect.org';
  public refferer : string |undefined;
  public qrCode: string | undefined = undefined;
  private gatewayUrl = environment.gatewayUri;
  private maiarProvider: WalletConnectProvider;
  private provider: ProxyProvider;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {
    this.provider = new ProxyProvider(this.gatewayUrl);
    
    this.activatedRoute.queryParams.subscribe(qp => {
      this.refferer = qp.refferer;
    });

    let onClientConnect = {
      onClientLogin: async () => {
        console.log(this.maiarProvider.address);
        let secretMessage = await this.profileService.getUserSecretNonceAsync(this.maiarProvider.address);

        let message = new SignableMessage({
          message: Buffer.from(secretMessage, 'ascii'),
        });

        let signedMessage = await this.maiarProvider.signMessage(message);

        console.log(signedMessage.signature.hex());
        this.authService.login(this.maiarProvider.address, signedMessage.signature.hex());


      },
      onClientLogout: () => { console.log("Logged out"); }
    };

    this.maiarProvider = new WalletConnectProvider(this.provider, this.bridgeAddress, onClientConnect);
  }

  async ngOnInit() {
  }

  public async loginDefi() {
      if (!this.authService.isLoggedIn()) {
      let extProvider = ExtensionProvider.getInstance();
      await extProvider.init();
      let connected = await extProvider.isConnected();
      if (connected) {
        let walletAddress = await extProvider.login();
        console.log(this.refferer);
        let secretMessage = await this.profileService.getUserSecretNonceAsync(walletAddress, this.refferer);

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

  public async loginWallet() {
    const walletProvider = new WalletProvider("http://devnet-wallet.elrond.com");

    const returnUrlWithToken = await walletProvider.login({ callbackUrl: "http://localhost:4200", token: "secretNonce2" });
    // http://localhost:4200/home?address=erd17e4uuvhhnncye6mxxzffmgfhtyz8tpf4ug25he23z99j6yg8lwfqus4n28&signature=1f4f86dc94a188037b8b4a85d66c3492dfdb3fbcb6999b124ffe1b8629c35ca5a99d962c80fc4127b4045550c5b5098b0d1db70a00edd83c5f6107abf30b9f06&loginToken=secretNonce2
    // walletProvider.logout();

  }


  public async loginMaiar() {
    await this.maiarProvider.init();
    if (this.maiarProvider.isInitialized()) {
      this.qrCode = await this.maiarProvider.login();
    }
  }

}
