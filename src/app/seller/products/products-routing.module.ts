import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path:'',
  // canActivate:[AuthGuard],
  children:[

    {path:'product',component:ProductComponent},
    {path:'productList',component:ProductListComponent},
    {path:'createProduct',component:CreateProductComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
