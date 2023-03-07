import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
 username:any;
 password:any;
  constructor(private router: Router,private storage: Storage) {this.storage.create(); }

  async logIn() {
    const users = await this.storage['get']('users') || [];
    const user = users.find((u: { username: any; password: any; }) => u.username === this.username && u.password === this.password);
    if (user) {
      this.router.navigate(['/home']);
    } else {
      console.log('Invalid username or password');
    }
    
  }

  signUp() {
    this.router.navigate(['/signup']);
  }


}
