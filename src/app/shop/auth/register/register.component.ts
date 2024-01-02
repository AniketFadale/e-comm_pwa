import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../../services/url.service';
import { CaptchaServiceService } from '../../services/captcha-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private toast: ToastrService,private captchaService:CaptchaServiceService,private serve:UrlService,private routes: Router){
    var el: any = document.querySelector('.grecaptcha-badge');
    if(el){

      el.style.display = 'block';
    }
  }
  ngOnInit(){
    this.executeCaptcha();
  }
  captcha!: string;
  async executeCaptcha() {
    this.captcha = await this.captchaService.execute('REGISTER');
  }
  payload={
    email: '' ,
    password: '' ,
    name: '' ,
    address: { 
      street: '', 
      addressLine2: '', 
      city: '', 
      state: '', 
      pin: '' 
      } ,
      captcha : ''
  };
  ValidatePin:boolean=false
  res:any
  submit(data:NgForm){
    let pin = document.getElementById('exampleInputPin')  ;
    console.log(data);
    if(data.value.pin > 999999 || data.value.pin <= 99999){
      this.toast.error('Entre valid Pincode','Please')
      this.ValidatePin =true
      
    }
    else{

      this.ValidatePin =false
    }
    if(!this.ValidatePin){
      this.payload.name = data.value.Full_Name;
      this.payload.email = data.value.email;
      this.payload.password =data.value.password;
      this.payload.address.street =data.value.street
      this.payload.address.city= data.value.city;
      this.payload.address.pin=data.value.pin;
      this.payload.address.state = data.value.state;
      this.payload.address.addressLine2 = data.value.addressLine2;
      this.payload.captcha=this.captcha;
      this.serve.registerCustomer(this.payload).subscribe((res)=>{
        console.log(res);
        this.res=res;
        this.executeCaptcha();
        this.toast.success('Successfully Registered','user')
        this.routes.navigate(['shop','auth','login'])
      },error=>{
        console.log(error);
        this.executeCaptcha();
        this.toast.error(error.error.message,'User')
        
      });
    }
  }
}
