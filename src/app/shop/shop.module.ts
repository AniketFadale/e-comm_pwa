import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopNavbarComponent } from './shop-navbar/shop-navbar.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { appReducer } from '../appStore/app.state';
import { GetdataService } from '../seller/localStorageService/getdata.service';


@NgModule({
  declarations: [
    ShopNavbarComponent,
    
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
   
    
  ],
  providers:[
  ]
})
export class ShopModule { 
  constructor(private getdata :GetdataService){
    getdata.seller.next(false)
  }
}
