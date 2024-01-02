import { NgModule, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './all-products/all-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TruncPipe } from './pipe/trunc.pipe';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { OneProductComponent } from './one-product/one-product.component';
import { Store } from '@ngrx/store';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';

@NgModule({
  declarations: [
    AllProductsComponent,
    TruncPipe,
    OneProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    FormsModule,
    SharedPipeModule
   
    
  ],
  providers:[
    TruncPipe,
    SharedPipeModule
  ]
})

export class ProductsModule implements OnInit {
 
  constructor(private getdata : GetdataService,private store : Store<any>){
    console.log('product constructor');
    
    
    var el: any = document.querySelector('.grecaptcha-badge');
    if(el){

      el.style.display = 'none';
    }
    let e=0;
    let flag=localStorage.getItem('customerLogin') || '' ;
    // console.log(flag);
    
   if(flag  ) {
    // console.log('yes');
    
     getdata.shop.next(true);
   }else{
    // console.log('no');
    
    getdata.shop.next(false);

   }
    

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log('product Onit');
    
  }
 }
 export const trunc = TruncPipe;
