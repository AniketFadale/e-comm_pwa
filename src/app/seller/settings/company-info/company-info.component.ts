import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import{StoreAtURLService}from 'src/app/seller/localStorageService/store-at-url.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/seller/localStorageService/local-storage.service';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent {
  constructor(private local:LocalStorageService,private routes : Router,private serve:StoreAtURLService,private toast :ToastrService,private getData :GetdataService){
    //this.creat=this.getData.getboolvar();
    
    getData.myVar.subscribe((data)=>{
      this.creat = data;
    })
    this.CallFirst();
    getData.setNav(false);
  }
  res:any={}
  user:{
    email:string,
    name:string
  }={
    email:'',
    name:''
  };
  newUser:any;
  creat:any;
  edt:boolean=true;
  editCompany(){
    this.edt=!this.edt;
  }

  updateCompany(){
    // console.log(this.user)

    this.serve.CompanyInfo(this.user).subscribe((res)=>{
      // console.log(res);
      this.edt=!this.edt;
      this.toast.success('Updated','Company Details')
    },(error)=>{
      this.toast.error(error.error.message , 'user')
      //  alert(error.error.message);
    });
    this.serve.getUser().subscribe((res:any)=>{
      // console.log('edittt',res)
      this.res=res;
      
      this.user["email"] =this.res?._org.email,
      this.user["name"] = this.res?._org.name
      this.CallFirst();
    })
  }
  CreateUser(){
    
    this.creat=!this.creat;
    this.getData.setboolvar(false);
    this.routes.navigate(['/setting/users'])
   
    
  }
  CallFirst(){
    this.serve.getUser().subscribe((res:any)=>{
      console.log('edittt',res)
      this.res=res;
      
      this.user["email"] =this.res._org.email,
      this.user["name"] = this.res._org.name
    })
  }
  
  
}
