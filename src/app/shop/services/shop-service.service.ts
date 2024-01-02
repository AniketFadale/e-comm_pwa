import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  constructor(private http:HttpClient) { }
  token:any = JSON.parse(localStorage.getItem('customerLogin')||'[]');

  url = 'https://shop-api.ngminds.com';

  getToken(){
    this.token = JSON.parse(localStorage.getItem('customerLogin')||'[]')  

  }
  // to create order
  createOrder(payload:any){
    console.log(payload);
 
   return this.http.post(this.url+'/shop/orders',payload,{headers:new HttpHeaders({
      Authorization : 'Bearer '+this.token,
    })})
  }

  // to confirm order

  ConfirmOrder(payload:any,id:any){
    return this.http.put(this.url+'/shop/orders/confirm/'+id,payload,{headers:new HttpHeaders({
      Authorization : 'Bearer '+this.token,
    })})
  }

  // to get order history

  getAllOrders(payload:any){
    this.getToken();
    return this.http.get(this.url+'/shop/orders',{headers:new HttpHeaders({
      Authorization : 'Bearer '+this.token,
    }),params:payload}
    )
  }


  // to get order details

  getOrderDetails(id:string){
    return this.http.get(this.url+'/shop/orders/'+id,{headers:new HttpHeaders({
      Authorization : 'Bearer '+this.token,
    })})
  }


    // to cancel Order
    
    cancelOrder(id:string){
      return this.http.patch(this.url+'/shop/orders/cancel/'+id,{},{headers:new HttpHeaders({
        Authorization : 'Bearer '+this.token,
      })})
    }

}
