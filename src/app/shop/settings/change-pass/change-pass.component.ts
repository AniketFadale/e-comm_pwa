import { Component } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {
  constructor(private serve:UrlService,private toast:ToastrService,private routes:Router){

  }
  OldPassHide: string = 'password';
  newPasshide: string = 'password';
  changePass(data: any) {
    if (data.value.new_password == data.value.Confirm_password) {
      var el:any
      el=document.getElementById('exampleInputPassword3');
      el.style.color = "black";
      this.serve
        .ChangePassword({
          new_password: data.value.new_password,
          old_password: data.value.old_password,
        })
        .subscribe(
          (res) => {
            this.toast.success('changed successfully', 'Password');
            this.routes.navigate(['shop/setting/self']);
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
