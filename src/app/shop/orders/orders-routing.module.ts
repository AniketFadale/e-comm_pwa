import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {path:'cart' , component:CartComponent},
  {path:'createOrder' , component:CreateOrderComponent},
  {path:'confirmOrder' , component:ConfirmOrderComponent},
  {path:'OrderHistory' , component:OrderHistoryComponent},
  {path:'OrderDetails' , component:OrderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
