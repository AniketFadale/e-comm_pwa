import { Component, ElementRef, OnInit } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { ToastrService } from 'ngx-toastr';
import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private activateRoute:ActivatedRoute,private getdata:GetdataService,private routes:Router,private captchaService : MyCaptchaService,private toast:ToastrService,private serve:UrlService){
    var el: any = document.querySelector('.grecaptcha-badge');
    if(el){

      el.style.display = 'block';
    }
  }
  ngOnInit(): void {
    this.executeCaptcha();
    this.activateRoute.queryParams.subscribe((res:any)=>{
        console.log(res);
        this.queryParam=res.return
        
    })
    
  }
  queryParam:any
  forgotPass(){

  }
  captcha!: string;
  async executeCaptcha() {
    this.captcha = await this.captchaService.execute('REGISTER');
  }
  res:any;
  loginCustomer(data:any){
    console.log(data.value);
    this.serve.loginCustomer({email:data.value.email,password:data.value.password}).subscribe((res)=>{
      this.res= res;
      this.executeCaptcha()
      console.log(res);
      localStorage.setItem('customerLogin',JSON.stringify(this.res.token)||'[]')
      
      this.toast.success('Login Successfully','Customer')
      this.getdata.shop.next(true)
      if(this.queryParam != undefined){
        this.routes.navigate([this.queryParam])
      }else{
        console.log(this.queryParam);
        
        this.routes.navigate(['/shop/setting/self']);

      }
    },error=>{

      console.log(error);
      this.toast.error(error.error.message);
      this.executeCaptcha()
    })
  }
  // loginWithGoogle(){

  // }
}
