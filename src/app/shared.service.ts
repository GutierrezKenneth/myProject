import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  username: any;
  password: any;

  constructor() { }

  setUsername(data:any){
    this.username = data;
  }

  setPassword(data:any){
    this.password = data;
  }

  getUsername(){
    return this.username;
  }

  getPassword(){
    return this.password;
  }

}
