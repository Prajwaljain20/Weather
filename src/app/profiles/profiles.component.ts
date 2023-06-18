import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProfile } from '../Profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profiles: IProfile[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(res => this.profiles = res);
  }

  onDelete(profile: IProfile) {
    this.profileService.deleteProfile(profile).then(res => console.log('Deleted', res));
  }

  getProfile(profile: IProfile) {
    this.profileService.specificProfile(profile).subscribe(res => {
      this.profileService.city.next(res.name);
    })
  }
}
