import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username:any;
  password:any;
  confirmPassword: any;
  fName:any;
  lName:any;
  pNumber:any;
  profileImage: any;
  usernameTouched = false;
  passwordTouched = false;
  confirmPasswordTouched = false;
  fNameTouched = false;
  lNameTouched = false;
  pNumberTouched = false;


  constructor( public router: Router,private storage: Storage, private alertController: AlertController) {this.storage.create();}
 
  ngOnInit(){
    this.fName = '';
    this.lName = '';
    this.pNumber = '';
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.profileImage="/assets/icon/profile.png"
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'Passwords do not match!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async userExistAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'Username already exists!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async shortPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'Please enter above 8 letter password length!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async longPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'Please enter bellow 16 letter password length!',
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

  onConfirmPasswordFocus() {
    if(this.confirmPassword == '')
    {
      this.confirmPasswordTouched = true;
    }

    else{
      this.confirmPasswordTouched = false;
    }
      
  }

  onfNameFocus() {
    if(this.fName == '')
    {
      this.fNameTouched = true;
    }

    else{
      this.fNameTouched = false;
    }
      
  }

  onlNameFocus() {
    if(this.lName == '')
    {
      this.lNameTouched = true;
    }

    else{
      this.lNameTouched = false;
    }
      
  }

  onpNumberFocus() {
    if(this.pNumber == '')
    {
      this.pNumberTouched = true;
    }

    else{
      this.pNumberTouched = false;
    }
      
  }








  async signUp() {

    if(this.username == '')
    {
      this.onUsernameFocus();
    }
    
   if(this.password == ''){
      this.onPasswordFocus();
    }

    if(this.confirmPassword == '')
    {
      this.onConfirmPasswordFocus();
    }

    if(this.fName == '')
    {
      this.onfNameFocus();
    }

    if(this.lName == '')
    {
      this.onlNameFocus();
    }
    
    if(this.pNumber == '')
    {
      this.onpNumberFocus();
    }

   else{
    const users = await this.storage.get('users') || [];
     if (users.find((u: { username: any; }) => u.username === this.username)) {
        this.userExistAlert();
       return;
     }

     if (this.password.length < 8){
      this.shortPasswordAlert();
        return;
     }
     if (this.password.length > 16){
      this.longPasswordAlert();
        return;
     }

     if (this.password !== this.confirmPassword) {
        this.presentAlert();
       return;
     }
      users.push({
        username: this.username,
        password: this.password,
        firstname: this.fName,
        lastname: this.lName,
        phonenumber: this.pNumber,
        profileImage: this.profileImage,
      });
      await this.storage.set('users', users);
      this.router.navigate(['login']);
     
   }

     
  }

  logIn() {
    this.router.navigate(['login']);
  }

 
}
