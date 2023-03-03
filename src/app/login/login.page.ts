import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  constructor(private router: Router) { }


  logIn() {
    // Navigate to home page after successful login
    this.router.navigate(['/home']);
  }

  signUp() {
    // Navigate to home page after successful login
    this.router.navigate(['/signup']);
  }


}
