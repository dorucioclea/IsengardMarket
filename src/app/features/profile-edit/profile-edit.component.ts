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
  public profile : Profile | undefined;

  constructor(private sanitizer: DomSanitizer, private authService : AuthService, private profileService: ProfileService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.profile = this.authService.currentProfileValue;
      if(this.profile?.profilePicture != undefined){
        this.profileImage = this.profile.profilePicture;
      }
    }
  }

  updateImage(ev: any, type: string) {
    if(type === 'cover'){
      this.mediaFileCover = ev.target.files[0];
      this.coverImage = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(ev.target.files[0])
      );
    }

    if(type ==='profile'){
      this.mediaFileProfile = ev.target.files[0];
      this.profileImage = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(ev.target.files[0])
      );
    }
  }

  updateProfile(){
    //this.profileService.updateProfileAsync(profile);
    var form = new FormData();
    form.append('profilePhoto', this.mediaFileProfile);
    if(this.profile?.accountId != null){
      console.log(form);
      console.log(this.profile.accountId);
      this.profileService.updateProfileImageAsync(form, this.profile.accountId);
    }
    alert('Profile updated successfully');
    
  }

}
