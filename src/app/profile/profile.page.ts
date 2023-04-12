import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public username: any;
  public password: any;
  public newPassword:any;

  constructor(private router: Router,private shared: SharedService,private storage: Storage,private alertController: AlertController,private loadingController: LoadingController) {
    this.username = this.shared.getUsername();
    this.password = this.shared.getPassword();
    this.newPassword = this.shared.getPassword();
    


   }





  async userUpdateAlert() {
    const loading = await this.loadingController.create({
      message: 'Changing Password!',
      duration: 2000
    });
    await loading.present();
  }
  

  ngOnInit() {
  }

  main(){
    this.router.navigate(['/main']);
  }
  settings(){
    this.router.navigate(['/settings']);
  }

  uploadProfile(){
    
  }


 async editInfo(){
  const users = await this.storage['get']('users') || [];

      const userIndex = users.findIndex((u: { username: any; password: any; }) => u.username === this.username && u.password === this.password);
      if (userIndex >= 0) {
      // Update the user object with new data
    users[userIndex] = {
      ...users[userIndex],
      password: this.newPassword
    };

    await this.storage['set']('users', users);
    this.shared.setPassword(this.newPassword);
    this.userUpdateAlert();

    this.router.navigate(['/profile']);

      }
    
  }



}
