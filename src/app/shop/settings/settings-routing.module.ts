import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoustmerProfileComponent } from './coustmer-profile/coustmer-profile.component';
import { AdressesComponent } from './adresses/adresses.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

const routes: Routes = [
  {path:'self', component:CoustmerProfileComponent},
  {path:'addresses',component:AdressesComponent},
  {path:'change-password',component:ChangePassComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
