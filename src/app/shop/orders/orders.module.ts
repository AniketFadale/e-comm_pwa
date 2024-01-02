import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { CartComponent } from './cart/cart.component';
import { ProductsModule } from '../products/products.module';
import { TruncPipe } from '../products/pipe/trunc.pipe';
import { FormsModule } from '@angular/forms';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedPipeModule } from "../../shared-pipe/shared-pipe.module";


@NgModule({
    declarations: [
        CartComponent,
        CreateOrderComponent,
        ConfirmOrderComponent,
        OrderHistoryComponent,
        OrderDetailsComponent
    ],
    imports: [
        CommonModule,
        OrdersRoutingModule,
        ProductsModule,
        FormsModule,
        NgxPaginationModule,
        SharedPipeModule
    ]
})
export class OrdersModule { }
