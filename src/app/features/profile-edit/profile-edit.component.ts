import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  public imagePath: string = '';
  public mediaFile: any;
  public coverImage: string | SafeUrl = "assets/images/add-media.png";
  public profileImage: string | SafeUrl = "assets/images/add-media.png";
  public profile : Profile | undefined;

  constructor(private sanitizer: DomSanitizer, private authService : AuthService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.profile = this.authService.currentProfileValue;
    }
  }

  updateImage(ev: any, type: string) {
    if(type === 'cover'){
      this.mediaFile = ev.target.files[0];
      this.coverImage = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(ev.target.files[0])
      );
    }

    if(type ==='profile'){
      this.mediaFile = ev.target.files[0];
      this.profileImage = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(ev.target.files[0])
      );
    }

  }

}
