import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NativeBiometric,BiometryType } from 'capacitor-native-biometric';

import { tr } from 'date-fns/locale';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  public hasBiometrics: boolean = false;
  public isBiometricsEnabled: boolean = false;
  public getTest:any;
  constructor(public router: Router) { }

  ngOnInit() {

    this.getTest = sessionStorage.getItem("userToggle")

    if(this.getTest == "true"){
      this.isBiometricsEnabled = true;
      this.enableBiometrics();
    }else{
      this.isBiometricsEnabled = false;
      this.disableBiometrics();
    }
    
    this.initiateBiometrics();

  }

 async change(){
    const result = await NativeBiometric.isAvailable();

    if(!result.isAvailable) return;

    const isFaceID = result.biometryType == BiometryType.FACE_ID;

    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      subtitle: "Finger print biometrics",
      description: "Put your registered finger print on sensor",
    })
      .then(() => true)
      .catch(() => false);
  if(!verified) return;
  
  else{  
   this.getTest = this.isBiometricsEnabled;
   sessionStorage.setItem("userToggle",this.getTest)
  }

  }


  async initiateBiometrics(){
    const result = await NativeBiometric.isAvailable();
    this.hasBiometrics = result.isAvailable;
    // Save user's credentials
    const credential = await NativeBiometric.getCredentials({
      server: "kennethgutierrez",
    }).then();
    if(credential.username){
      this.isBiometricsEnabled = true;
    }
    else{
      this.isBiometricsEnabled = false;
    }
  }

  logout(){
    this.router.navigate(['landingpage']);
  }
  
  main(){
    this.router.navigate(['main']);
  }
  profile(){
    this.router.navigate(['profile']);
  }

  enableBiometrics(){
    // Save user's credentials
    NativeBiometric.setCredentials({
    username: sessionStorage.getItem("username")|| "",
    password: sessionStorage.getItem("password")|| "",
    server: "kennethgutierrez",
}).then();
  }

  disableBiometrics(){
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
    server: "kennethgutierrez",
}).then();
  }


}
