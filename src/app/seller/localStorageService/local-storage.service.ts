import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  {

  constructor(private routes:Router) {
    
  }
  data:any;
  x:boolean=true;
  getLocal(){
    
    let a = localStorage.getItem('token');
     return this.data = a && JSON.parse(a)
  }
  returnBool(){
    this.data == null ? this.x = true: this.x = false;
    return this.x
  }
  setLocal(token:any){
    return localStorage.setItem('token',JSON.stringify(token));
  }
  clearLocal(){
    localStorage.setItem('token',JSON.stringify([]));
  }
  


 
}
