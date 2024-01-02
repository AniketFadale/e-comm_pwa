import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthGuard } from 'src/app/seller/guards/auth.guard';
import { LocalStorageService } from 'src/app/seller/localStorageService/local-storage.service';
import { Token } from '@angular/compiler';
import{StoreAtURLService}from 'src/app/seller/localStorageService/store-at-url.service'
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
// import { MyCaptchaService } from 'src/app/localStorageService/my-captcha.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  constructor(private getdata:GetdataService,private routes : Router,private local:LocalStorageService,private serve :StoreAtURLService){
    this.arr = this.getlocal ? JSON.parse(this.getlocal) : this.getlocal;
    // console.log('myprofile constructor')
    this.token1 = local.getLocal();
    serve.getUser().subscribe((res:any)=>{
      this.res = res;
      // console.log('Header Works',this.res);

    });
    
    getdata.setNav(false);
    getdata.setlogedUser(this.res);

    
  }

  ngOnInit(){
  }
  res:any;
  token1: any;
  
  arr:any;
  
  edit_var:boolean=true;
  profile:any={
    // name:'a',
    // email:'b',
    // CompanyName : 'c',
    // Role:'d',
    // password:'123'
  };
  
  getlocal = localStorage.getItem('token');
  
  logout(){

    this.local.clearLocal();
    console.log('outttt');
    
    
    this.routes.navigate(['auth/login']);
  }

  myName:string="Ajay";

  editProfile(){
    this.routes.navigate(['setting','company-info'])
    this.edit_var=false;
    this.profile["name"]=this.res.name;
    this.profile["email"]=this.res.email;
    this.profile["CompanyName"]=this.res._org.name;
    this.profile["Role"]=this.res.role;
    this.profile["isEmailVerified"]=this.res.isEmailVerified;

    
  }
  updateProfile(x:NgForm){
    // console.log(x.value);
    
    this.edit_var=true;
  }
  verifyEmail(){
    
    this.serve.VerifyEmail().subscribe((res)=>{
      console.log(res);
      
    },error=>{
      console.log(error);
      
    });
  }
}
