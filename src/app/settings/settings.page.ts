import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NativeBiometric } from 'capacitor-native-biometric';
import { tr } from 'date-fns/locale';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  public hasBiometrics: boolean = false;
  public isBiometricsEnabled: boolean = false;
  constructor(public router: Router) { }

  ngOnInit() {
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
    this.router.navigate(['/landingpage']);
  }
  
  main(){
    this.router.navigate(['/main']);
  }
  profile(){
    this.router.navigate(['/profile']);
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
