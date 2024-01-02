import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CoustmerProfileComponent } from './coustmer-profile/coustmer-profile.component';
import { FormsModule } from '@angular/forms';
import { AdressesComponent } from './adresses/adresses.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    CoustmerProfileComponent,
    AdressesComponent,
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ImageCropperModule
  ]
})
export class SettingsModule { 
  constructor(private getdata:GetdataService){
    getdata.shop.next(true);
  }
}
