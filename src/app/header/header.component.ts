import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profilePhotoUrl: string = 'https://via.placeholder.com/40';  // Default profile photo
  userName: string = 'John Doe';  // Default user name

  constructor() {}

  ngOnInit(): void {
    // Example: Fetch user data from a service or API
    // this.profilePhotoUrl = this.userService.getProfilePhoto();
    // this.userName = this.userService.getUserName();
  }
}
