import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.page.html',
  styleUrls: ['./landingpage.page.scss'],
})
export class LandingpagePage {

  constructor(private router: Router) {}
 

   goToLogIn(){
  this.router.navigate(['login'])
   }

   goToSignUp(){
    this.router.navigate(['signup'])
     }



}
