import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderdetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    FormsModule,
    SharedPipeModule
  ]
})
export class OrdersModule { }
