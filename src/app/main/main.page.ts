import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { format } from 'date-fns';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public currentTime: string;
  public username:any;


  constructor(private shared: SharedService, private router: Router) {
     // Set the initial value of the current s

     this.username = this.shared.getUsername();  
     
  
     this.currentTime = format(new Date(), 'h:mm:ss a');

     // Update the current time every second
     interval(1000).subscribe(() => {
       this.currentTime = format(new Date(), 'h:mm:ss a');
     });

   }

  ngOnInit() {
  }


  profile(){
    this.router.navigate(['profile']);
  }
  settings(){
    this.router.navigate(['settings']);
  }

}
