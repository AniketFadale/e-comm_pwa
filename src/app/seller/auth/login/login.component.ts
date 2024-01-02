import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{StoreAtURLService}from 'src/app/seller/localStorageService/store-at-url.service'
import { LocalStorageService } from 'src/app/seller/localStorageService/local-storage.service';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // el: any;
  constructor(private captchaService : MyCaptchaService,private route : Router,private toast :ToastrService,private serve :StoreAtURLService,private local: LocalStorageService,private getdata:GetdataService,private socialAuthService:SocialAuthService){
    // this.arr = this.getlocal &&JSON.parse(this.getlocal) ;
    this.arr=local.getLocal()
      // console.log(this.arr);
      getdata.seller.next(true)
      if(this.arr)
      {
        this.settime()
      }
      getdata.setNav(true);
      
    }
    settime(){
      
      setTimeout(()=>{
  
        var el: any = document.querySelector('.grecaptcha-badge');
        if(el){

          el.style.display = 'none';
        }
      },1000)
  
      
      this.route.navigate(['setting','my-profile']);
  }
  ngOnInit(): void {
    this.executeCaptcha();
  }
  res:any;
  arr:any;
  z:boolean=false;
  
  // getlocal= localStorage.getItem('token');
  captcha!: string;
    executeCaptcha() {
    setTimeout(async() => {
      
      this.captcha = await this.captchaService.execute('REGISTER');
      console.log(this.captcha);
      
    }, 1000);
  }

  
  loginUser(data:NgForm){
    // console.log(this.captcha);
    
    let user1={
      email : data.value.email,
      password : data.value.password,
      // captcha:this.captcha
    }
    this.serve.LogPostUser(user1).subscribe((res:any)=>{
      console.log(res);
      this.executeCaptcha();
      this.res=res;
      this.local.setLocal(res.token);
      this.loginSuccessfull();
      
      this.route.navigate(['setting','my-profile']);
      this.getdata.setNav(false)
    }
    ,(err)=>{
      this.executeCaptcha();
      this.toast.error(err.error.message,'User')
    })    
    this.z=false;
  
  }
  loginSuccessfull(){
    var el: any = document.querySelector('.grecaptcha-badge');
    if(el){

      el.style.display = 'none';
    }
    this.toast.success('login successfully' , 'User');
  }
  loginFail(){
    this.toast.error('login fail','User')
  }
  forgotPass(){
    // alert('fP')
    this.route.navigate(['/auth/forgot-password'])
  }
  
  tokenValue=null

  // login with google
  
  loginWithGoogle(){
    
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response)=>{
      console.log(response);
      let token=response.idToken;
      this.serve.googleSignIn({token:token,captcha:this.captcha}).subscribe((response:any)=>{
      
        
        var el: any = document.querySelector('.grecaptcha-badge');
        if(el){

          el.style.display = 'ngone';
        }
        this.route.navigate(['setting','my-profile']);
        console.log(response);
        this.tokenValue=response.token;
        localStorage.setItem('token',JSON.stringify(this.tokenValue));
      },(err)=>{
        // this.httpService.error.next(err.error.message);
        console.log(err);
        this.toast.error('Error','err.error.message');
        
      },()=>{
        
      });
    });
  }
  
}


