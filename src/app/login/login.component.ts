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
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both fields';
      return;
    }

    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log('Login successful:', userCredential.user);
        // Redirect to ProductComponent after successful login
        this.router.navigate(['/product']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error('Login error:', error);
      });
  }

  signUp() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both fields';
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log('Signup successful:', userCredential.user);
        this.router.navigate(['/product']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error('Signup error:', error);
      });
  }
}
