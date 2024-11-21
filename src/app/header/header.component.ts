import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string = 'John Doe'; // Replace with actual user name from the auth service
  profilePhotoUrl: string = 'assets/profile.jpg'; // Replace with actual profile photo URL

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  logout() {
    this.afAuth.signOut().then(() => {
      // Redirect to login page after successful logout
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  }
}
