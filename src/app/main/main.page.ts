import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { format } from 'date-fns';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';




@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public currentTime: string;
  public username:any;
  public password:any;
  public fName:any;



  constructor(private shared: SharedService, private router: Router,private storage: Storage) {
     // Set the initial value of the current s

     this.username = this.shared.getUsername();
     this.password = this.shared.getPassword();

     console.log(this.username,this.password);
  
     this.currentTime = format(new Date(), 'h:mm:ss a');

     // Update the current time every second
     interval(1000).subscribe(() => {
       this.currentTime = format(new Date(), 'h:mm:ss a');
     });

   }

  ngOnInit() {

    this.getInfo();
  }


  async getInfo(){
    const users = await this.storage.get('users') || [];
    const userIndex = users.findIndex((u: { username: any; password: any; }) => u.username === this.username && u.password === this.password);
    if(userIndex >=0){
      const fname = users[userIndex].firstname;

     this.fName = fname;
    }
  }

  profile(){
    this.router.navigate(['profile']);
  }
  settings(){
    this.router.navigate(['settings']);
  }

}
