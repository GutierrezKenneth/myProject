import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  constructor(private router: Router) {}

  signUp() {
   
    // Navigate to home page after successful login
    this.router.navigate(['/home']);
  }

  logIn() {
    // Navigate to home page after successful login
    this.router.navigate(['login']);
  }

 
}
