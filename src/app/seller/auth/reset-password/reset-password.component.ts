import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/seller/localStorageService/local-storage.service';
import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  constructor(
    private routes: Router,
    private toast: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private getlocal: LocalStorageService,
    private captchaService: MyCaptchaService,
    private serve: StoreAtURLService,

  ) {
    this.executeCaptcha();
    _activatedRoute.queryParams.subscribe(
      (params) => (this.para = params['token'])
    );
  }
  payload = {
    password: '',
  };
  para!: any;
  captcha!: string;
  async executeCaptcha() {
    this.captcha = await this.captchaService.execute('REGISTER');
  }
  resetPass(user: any) {
    
    // console.log(user.value.Confirmpassword);
    if(user.value.Confirmpassword==user.value.password)
    {
      var el:any
      el=document.getElementById('exampleInputPassword2');
      el.style.color = "black";
      this.payload.password = user.value.password;
      this.serve.resetPassword(this.payload, this.para).subscribe(
        (res) => {
          // console.log(res);
          this.toast.success('Reset successfully', 'Password');
          this.routes.navigate(['/auth/login']);
        },
        (error) => {
          this.toast.error(error.message);
          // console.log(error);
        }
      );
    }else{
      var el:any
      el=document.getElementById('exampleInputPassword2');
      el.style.color = "red";
      this.toast.error('Does not match','Password');
    }
  }
      
}
