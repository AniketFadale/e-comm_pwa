import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { UsersComponent } from './company-info/users/users.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarafterLoginComponent } from '../../navbarafter-login/navbarafter-login.component';

@NgModule({
  declarations: [
    CompanyInfoComponent,
    UsersComponent,
    MyProfileComponent,
    ChangePasswordComponent
  
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    // NgxUiLoaderModule,
    // NgxUiLoaderHttpModule.forRoot({
    //   showForeground:true,
    // })
  ],
  providers:[
    UsersComponent,
    
  ]
})
export class SettingsModule { }
