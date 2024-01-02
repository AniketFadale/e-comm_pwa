import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
// import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {path:'',redirectTo:'shop',pathMatch:'full'},
    {path: '', 
      loadChildren:() => import('./seller/seller.module').then((m)=>m.SellerModule)    
  },
  {
    path:'shop',
    loadChildren:()=> import('./shop/shop.module').then((m)=>m.ShopModule)
  },
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  // },
  // {
  //   path: 'setting',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./settings/settings.module').then((m) => m.SettingsModule),
  // },
  // {
  //   path:'products',
  //   canActivate: [AuthGuard],
  //   loadChildren:()=>import('./products/products.module').then((m)=> m.ProductsModule),
  
  // },

  { path: '**', component:NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
