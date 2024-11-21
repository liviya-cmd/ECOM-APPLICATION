import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  onLogin() {
    this.loginError = null;

    this.afAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log('Login successful');
        this.router.navigate(['/product']);
      })
      .catch((error) => {
        console.error('Login failed', error);
        this.handleLoginError(error);
      });
  }

  private handleLoginError(error: any) {
    if (error.code === 'auth/user-not-found') {
      this.loginError = 'No user found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      this.loginError = 'Incorrect password.';
    } else {
      this.loginError = 'An error occurred. Please try again.';
    }
  }
}
