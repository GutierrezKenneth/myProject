import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username:any;
  password:any;
  confirmPassword: any;

  constructor( public router: Router,private storage: Storage) {this.storage.create();}
 
  ngOnInit(){}
  async signUp() {
   
     const users = await this.storage.get('users') || [];
     if (users.find((u: { username: any; }) => u.username === this.username)) {
       console.log('Username already exists');
       return;
     }
     if (this.password !== this.confirmPassword) {
       console.log('Passwords do not match');
       return;
     }
     users.push({
       username: this.username,
       password: this.password,
     });
     await this.storage.set('users', users);
     this.router.navigate(['/login']);
  }

  logIn() {
    this.router.navigate(['login']);
  }

 
}
