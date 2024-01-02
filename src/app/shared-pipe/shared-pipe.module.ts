import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeCurrencyPipe } from './pipes/change-currency.pipe';
import { DealDirectiveDirective } from './directive/deal-directive.directive';


@NgModule({
  declarations: [
    ChangeCurrencyPipe,
    DealDirectiveDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ChangeCurrencyPipe,
    DealDirectiveDirective
 
  ],
})
export class SharedPipeModule { }
