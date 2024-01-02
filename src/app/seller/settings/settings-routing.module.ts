import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { UsersComponent } from './company-info/users/users.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  
    
    // canActivateChild:[AuthGuard],
    // {path : '',redirectTo:'my-profile'},
      {
        path: 'my-profile',
        component: MyProfileComponent,
      },
      {
        path: 'company-info',
        component: CompanyInfoComponent,
      },
      {
        path:'users' ,component : UsersComponent,
      },
      {
        path:'change-password',component: ChangePasswordComponent,
      }
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
