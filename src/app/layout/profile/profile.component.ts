import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Profile } from 'src/app/core/interface';
import { ProfileService } from 'src/app/core/services/profile.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: String;
  token: String;
  profile:Profile;
  constructor(private profileService: ProfileService, private authService: AuthService) { }
  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.token = this.authService.getRefreshToken();
    if(this.userId) {
      this.profileService.getProfile(this.userId, this.token).subscribe((pfile: Profile) => {
        console.log(pfile)
        this.profile = pfile;
        if(!pfile) {
          this.authService.logout();
          return false;
        }
        if(pfile._id !== this.userId) {
          this.authService.logout();
          return false;
        } else {
          return true;
        }
      })
    }
  }

}
