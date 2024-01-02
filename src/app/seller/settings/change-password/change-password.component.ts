import { Component } from '@angular/core';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  constructor(
    private serve: StoreAtURLService,
    private routes: Router,
    private toast: ToastrService
  ) {}
  
  OldPassHide: string = 'password';
  newPasshide: string = 'password';
  changePass(data: any) {
    if (data.value.new_password == data.value.Confirm_password) {
      var el:any
      el=document.getElementById('exampleInputPassword3');
      el.style.color = "black";
      this.serve
        .changePassword({
          new_password: data.value.new_password,
          old_password: data.value.old_password,
        })
        .subscribe(
          (res) => {
            this.toast.success('changed successfully', 'Password');
            this.routes.navigate(['my-profile']);
          },
          (error) => {
            this.toast.error(error, 'Password');
            // console.log(error);
          }
        );
    } else {
      this.toast.error('Does not match', 'Confirm Password');
      var el:any
      el=document.getElementById('exampleInputPassword3');
      el.style.color = "red";
    }
    // console.log(data);
  }
}
