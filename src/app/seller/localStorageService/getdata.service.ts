import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor() { 

    
  }
  creat:boolean=true;
  display:boolean=true;
  user = new BehaviorSubject<object>({});
  myVar = new BehaviorSubject<boolean>(true);

  setboolvar(x:boolean){
    this.creat=x;
    this.myVar.next(x);
    
  }
  // getboolvar(){

  //   this.myVar.subscribe((data)=>{
  //     return data;
  //   })
  //   //return this.creat;
  // }
  shop =new BehaviorSubject<boolean>(true)
  seller =new BehaviorSubject<boolean>(false)
  myNav = new BehaviorSubject<boolean>(true);
  setNav(x:boolean){
    this.display=x;
    this.myNav.next(x);
  }
  getNav(){
    this.myNav.subscribe((data)=>{
      return data;
    })
  }
  setlogedUser(user:{}){
    this.user.next(user);
  }
  getlogedUser(){
    this.user.subscribe((data)=>{
      return data;
    })
  }
}
