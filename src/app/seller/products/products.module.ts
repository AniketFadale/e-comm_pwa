import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncPipe } from './pipe/trunc.pipe';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { GetdataService } from '../localStorageService/getdata.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedPipeModule } from "../../shared-pipe/shared-pipe.module";
@NgModule({
    declarations: [
        ProductListComponent,
        ProductComponent,
        CreateProductComponent,
        TruncPipe
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        FormsModule,
        NgxPaginationModule,
        NgxDropzoneModule,
        AngularEditorModule,
        SharedPipeModule
    ]
})
export class ProductsModule {
  constructor(private getdata :GetdataService){
    getdata.seller.next(true)
  }
 }
