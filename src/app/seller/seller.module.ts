import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { NavbarafterLoginComponent } from '../navbarafter-login/navbarafter-login.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { GetdataService } from './localStorageService/getdata.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerRoutingModule,
    NgxDropzoneModule
    
  ],
  providers:[
    NavbarafterLoginComponent
  ]
  
})
export class SellerModule { 
  constructor(private getdata :GetdataService){
    getdata.seller.next(true)
  }
}
