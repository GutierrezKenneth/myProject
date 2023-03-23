import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { SharedService } from '../shared.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
 public username:any;
 public password:any;
 public pname: any;
usernameTouched = false;
passwordTouched = false;
  constructor(private router: Router,private storage: Storage, private alertController: AlertController, private shared: SharedService) {this.storage.create(); }

  ngOnInit() {

    this.username = '';
    this.password = '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'Invalid password or Username!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  onUsernameFocus() {
    if(this.username == ''){
      this.usernameTouched = true;
    }

    else{
      this.usernameTouched = false;
    }

  }

  onPasswordFocus() {
    if(this.password == '')
    {
      this.passwordTouched = true;
    }

    else{
      this.passwordTouched = false;
    }
      
  }

  
  async logIn() {
    if(this.username == ''){
      this.onUsernameFocus();
    }
    if(this.password== '')
    {
      this.onPasswordFocus();
    }
    
    else{
      const users = await this.storage['get']('users') || [];
      const user = users.find((u: { username: any; password: any; }) => u.username === this.username && u.password === this.password);
        if (user) {
          this.pname = this.username;
          this.shared.setUsername(this.pname);
          this.username ='';
          this.password = '';
         this.router.navigate(['/home']);
        

         
  
       } else {
          this.presentAlert();
        } 
    }
    
    
  }

  signUp() {
    this.router.navigate(['/signup']);
  }








}
