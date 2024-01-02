import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from '../settings/my-profile/my-profile.component';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  {path:'',canActivate:[AuthGuard] , component:MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
