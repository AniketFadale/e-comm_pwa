import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/seller/localStorageService/local-storage.service';
import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  para!: any;
  constructor(
    private routes: Router,
    private toast: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private serve: StoreAtURLService,
    private getlocal: LocalStorageService,
    private captchaService: MyCaptchaService
  ) {
    _activatedRoute.queryParams.subscribe(
      (params) => (this.para = params['token'])
    );
    serve.VerifyAccount(this.para).subscribe((res)=>{
      console.log(res);
      routes.navigate(['setting','myprofile'])
    })
  }
}
