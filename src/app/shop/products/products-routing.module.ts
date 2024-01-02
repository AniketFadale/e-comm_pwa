import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { OneProductComponent } from './one-product/one-product.component';

const routes: Routes = [
  {path:'' , component:AllProductsComponent},
  {path:'product',component:OneProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
