import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  public imagePath: string = '';
  public mediaFileProfile: any;
  public mediaFileCover: any;
  public coverImage: string | SafeUrl = "assets/images/add-media.png";
  public profileImage: string | SafeUrl = "assets/images/add-media.png";
  public profile: Profile | undefined;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.profile = this.authService.currentProfileValue;
      if (this.profile?.profilePicture != undefined) {
        this.profileImage = this.profile.profilePicture;
      }
      if (this.profile?.coverPicture != undefined) {
        this.coverImage = this.profile.coverPicture;
      }
    }
  }

  updateImage(ev: any, type: string) {
    if (type === 'cover') {
      this.mediaFileCover = ev.target.files[0];
      this.coverImage = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(ev.target.files[0])
      );
    }

    if (type === 'profile') {
      this.mediaFileProfile = ev.target.files[0];
      this.profileImage = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(ev.target.files[0])
      );
    }
  }

  async updateProfile() {
    
    var form = new FormData();
    form.append('profilePhoto', this.mediaFileProfile);
    form.append('coverPhoto', this.mediaFileCover);
    if (this.profile?.accountId != null) {
      var x = await this.profileService.updateProfileAsync(this.profile, this.profile.accountId);
      console.log(x);
      if (this.mediaFileProfile != undefined) {
        await this.profileService.updateProfileImageAsync(form, this.profile.accountId);
      }

      if (this.mediaFileCover != undefined) {
        await this.profileService.updateCoverImageAsync(form, this.profile.accountId);
      }

      const profile = await this.profileService.getProfileAsync(this.profile?.accountId);
      this.authService.updateProfile(profile);
    }


    alert('Profile updated successfully');

  }

}
