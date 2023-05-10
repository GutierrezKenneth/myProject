import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding, FilesystemDirectory } from '@capacitor/filesystem';
import { profile } from 'console';
import { Capacitor } from '@capacitor/core';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public username: any;
  public password: any;
  public fName:any;
  public lName:any;
  public pNumber:any;
  public newPassword:any;
  public newfName:any;
  public newlName:any;
  public newpNumber:any;

  public getPicture:any;
  public getProfile:any;

  constructor(private router: Router,
    private shared: SharedService,
    private storage: Storage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private platform: Platform
    ) 
  {
    this.username = this.shared.getUsername();
    this.password = this.shared.getPassword();
    // this.newPassword = this.shared.getPassword();
  }

   ngOnInit() {

    this.getInfo();

    Camera.requestPermissions({permissions:['photos']})
    this.loadProfile();
  }

  async getInfo(){
    const users = await this.storage.get('users') || [];
    const userIndex = users.findIndex((u: { username: any; password: any; }) => u.username === this.username && u.password === this.password);
    if(userIndex >=0){
      const fname = users[userIndex].firstname;
      const lname = users[userIndex].lastname;
      const pnumber = users[userIndex].phonenumber;
      const password = users[userIndex].password;
      const username = users[userIndex].username;

     this.newfName = fname;
     this.newlName = lname;
     this.newpNumber = pnumber;
     this.newPassword = password;
     this.username = username;
    }
  }


  async userUpdateAlert() {
    const loading = await this.loadingController.create({
      message: 'Changing Information!',
      duration: 2000
    });
    await loading.present();
  }
  
  async loadProfile() {
    // Get the URI of the saved image from local storage
    const users = await this.storage.get('users') || [];
    const userIndex = users.findIndex((u: { username: any; password: any; }) => u.username === this.username && u.password === this.password);
    if(userIndex >=0){
      const profileImage = users[userIndex].profileImage;


      if(profileImage == "/assets/icon/profile.png"){
        this.getProfile = "/assets/icon/profile.png";
      }
      else{
        this.getProfile = profileImage;
      }
    }

  }

  async takePhoto() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Photos,
      allowEditing: true,
      resultType: CameraResultType.Base64, // Set the result type to Base64
      correctOrientation: true,
      saveToGallery: false
    });

    if (image.base64String) {
      const imageString = 'data:image/jpeg;base64,' + image.base64String; // Prepend the base64 string with the required metadata

      // Save the file URI to local storage
      const users = await this.storage.get('users') || [];
      const userIndex = users.findIndex((u: { username: any; password: any; }) => u.username === this.username && u.password === this.password);

      if (userIndex >= 0) {
        users[userIndex] = {
          ...users[userIndex],
          profileImage: imageString
        };
        await this.storage.set('users', users);
        this.loadProfile();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

  
  
  

  main(){
    this.router.navigate(['/main']);
  }
  settings(){
    this.router.navigate(['/settings']);
  }



 async editInfo(){
  const users = await this.storage['get']('users') || [];

      const userIndex = users.findIndex((u: { username: any; password: any; }) => u.username === this.username && u.password === this.password);
      if (userIndex >= 0) {
      // Update the user object with new data
    users[userIndex] = {
      ...users[userIndex],
      firstname: this.newfName,
      lastname: this.newlName,
      phonenumber: this.newpNumber,
      password: this.newPassword
    };

    await this.storage['set']('users', users);
    this.userUpdateAlert();
    this.router.navigate(['/profile']);

      }
    
  }



}
