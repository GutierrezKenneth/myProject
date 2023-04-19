  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { Storage } from '@ionic/storage-angular';
  import { AlertController } from '@ionic/angular';
  import { SharedService } from '../shared.service';
  import { LoadingController } from '@ionic/angular';
  import { BiometryType, NativeBiometric } from "capacitor-native-biometric";
import { tr } from 'date-fns/locale';



  @Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  })
  export class LoginPage  {
  public username:any;
  public password:any;
  public pname: any;
  public getPass: any;
  usernameTouched = false;
  passwordTouched = false;
  public sessionTest:any
  public hideBiometrics = false;
  public getTest:any;
    constructor(private router: Router,private storage: Storage, private alertController: AlertController, private shared: SharedService,private loadingController: LoadingController) {this.storage.create(); }

    ngOnInit() {

      this.username = '';
      this.password = '';

      this.getTest = sessionStorage.getItem("userToggle")
      if(this.getTest == "true"){
        this.hideBiometrics = true;
      }else{
       this.hideBiometrics = false
      }

      


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
            this.getPass = this.password;
            this.shared.setUsername(this.pname);
            this.shared.setPassword(this.getPass);
            
            this.getTest = sessionStorage.getItem("username");

            if(this.getTest != this.username){
              sessionStorage.setItem("userToggle" ,"false")
            }
        
            
              sessionStorage.setItem("username",this.username)
              sessionStorage.setItem("password", this.password)
              this.username ='';
              this.password = '';
              this.router.navigate(['/main']);


              
           
           
          
          

          
    
        } else {
            this.presentAlert();
          }
      }
      
    
    }

    signUp() {
      this.router.navigate(['/signup']);
    }

    async biometrics(){
      const result = await NativeBiometric.isAvailable();

    if(!result.isAvailable) return;

    const isFaceID = result.biometryType == BiometryType.FACE_ID;

    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      subtitle: "Maybe add subtitle here?",
      description: "Maybe a description too?",
    })
      .then(() => true)
      .catch(() => false);

    if(!verified) return;

    const credentials = await NativeBiometric.getCredentials({
      server: "kennethgutierrez",
    });

    if(credentials.username){
     this.username=credentials.username
     this.password=credentials.password
     this.logIn();
    }

  }









  }
