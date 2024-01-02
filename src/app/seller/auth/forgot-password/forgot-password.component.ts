import { Component } from '@angular/core';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private toast :ToastrService,private serve : StoreAtURLService,private routes : Router,private captchaService:MyCaptchaService){
    this.executeCaptcha();
  }
  captcha!: string;
  async executeCaptcha() {
    this.captcha = await this.captchaService.execute('REGISTER');
    // console.log(this.captcha);
    
  }
  payload={
    email:'',
    captcha :'',
  };
  forgotPass(user:any){
    // console.log(this.captcha);
    this.payload.email = user?.value?.email
    this.payload.captcha = this.captcha

    this.serve.forgotPassword(this.payload).subscribe((res:any)=>{
      console.log(res);
      console.log("Inside Service")
      this.routes.navigate(['/auth/login']);
    },(error:any)=>{
      console.log('Inside Error');
    });
    
  }

}
