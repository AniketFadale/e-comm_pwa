import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../seller/localStorageService/local-storage.service';
import { Router } from '@angular/router';
import { GetdataService } from '../seller/localStorageService/getdata.service';
import { StoreAtURLService } from '../seller/localStorageService/store-at-url.service';
import { GetCutomerLoginService } from '../shop/services/get-cutomer-login.service';
@Component({
  selector: 'app-navbarafter-login',
  templateUrl: './navbarafter-login.component.html',
  styleUrls: ['./navbarafter-login.component.css']
})
export class NavbarafterLoginComponent implements OnInit {
  constructor(private customer : GetCutomerLoginService,private serve:StoreAtURLService,private local:LocalStorageService,private routes :Router,private creat :GetdataService,private getdata:GetdataService){
    this.loc=this.local.returnBool();
    // console.log(this.loc);
    getdata.seller.subscribe((data)=>{
      this.seller=data;
    })
    getdata.shop.subscribe((data)=>{
      this.shop=data;
    })
    getdata.myNav.subscribe((data)=>{
      this.loc=data;
      console.log(this.loc);
      
      if(!this.loc){

        this.serve.getUser().subscribe((res:any)=>{
          this.res = res;
          this.logedUser=this.res.name;
        },(err:any)=>{
          console.log(err);
          
        });
      }
    })
    
  }
  seller:boolean=false;
  shop:boolean=true
  
  ngOnInit(): void {
  }
  loc:any;
  res:any=this.getdata.getlogedUser;
  logedUser:string=this.res.name;
  logout(){

    this.local.clearLocal();
    // console.log('outttt');
    
    
    this.routes.navigate(['auth/login']);
  }
  createuser(){
    this.creat.setboolvar(false);
    this.routes.navigate(['setting/users'])
  }
  logout2(){
    this.customer.clearLocal()
    
  }

}
