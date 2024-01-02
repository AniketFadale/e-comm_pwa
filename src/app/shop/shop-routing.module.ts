import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopGuardGuard } from './guards/shop-guard.guard';

const routes: Routes = [
  {
    path:'',
     
    loadChildren:()=>import('./products/products.module').then((m)=> m.ProductsModule),
  
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'setting',
    canActivate: [ShopGuardGuard],
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'orders',
   
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
