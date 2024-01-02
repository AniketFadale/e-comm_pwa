import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { pipe } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-regisration',
  templateUrl: './regisration.component.html',
  styleUrls: ['./regisration.component.css'],
})
export class RegisrationComponent implements OnInit {
  // router(router: any, arg1: string) {
  //   throw new Error('Method not implemented.');
  // }
  // user(user: any) {
  //   throw new Error('Method not implemented.');
  // }
  route: any;
  constructor(
    private routes: Router,
    private http: HttpClient,
    private serve: StoreAtURLService,
    private toast:ToastrService,
    private captchaService:MyCaptchaService
  ) {
    // this.executeCaptcha();
  }
  ngOnInit(){
   setTimeout(async()=>{
    this.captcha = await this.captchaService?.execute('REGISTER');

  },1000)

  }
  errorMessage!:any
  captcha!: string;
  // async executeCaptcha() {
  //   this.captcha = await this.captchaService?.execute('REGISTER');
  // }
  res: any;
  xyz:any=[];


  submit(data: any) {
    
    // console.log(data.value);
    

    
    let user = {
      name: data?.value?.Full_Name,
      email: data?.value?.email,
      password: data?.value?.password,
      company: data?.value?.Company_Name,
      captcha : this.captcha,
    };
// console.log(user.name);
    this.serve.RegistrePostUser(user).subscribe(
      (res) => {
        this.res = res;
        // console.log(this.res);
        this.ngOnInit();
        this.toast.success('Successfully Registered','user')
        this.routes.navigate(['/auth/login']);
      },
      (err) => {
        // alert(err.error.message);
        // console.log(this.captcha);
        this.ngOnInit();
        this.errorMessage=err.error.messeage
        this.toast.error(err.error.message,'user')
      }
      
    );
  }
  
  

}
