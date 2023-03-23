import { Injectable } from '@angular/core';
import { da } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  username: any;

  constructor() { }

  setUsername(data:any){
    this.username = data;
  }

  getUsername(){
    return this.username;
  }

}
