import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopServiceService } from '../../services/shop-service.service';
import { GetCutomerLoginService } from '../../services/get-cutomer-login.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  constructor(private getCurrency : GetCutomerLoginService,private serveOrder : ShopServiceService,private routes : Router, private activatedRoute : ActivatedRoute){
    activatedRoute.queryParams.subscribe((val:any)=>{
      console.log(val.id);
      this.id=val.id
    })
    getCurrency.currency.subscribe((data)=>{
      this.currency = data;
    })
    this.getproduct()
  }
  
  currency!:string
  id:any
  res:any
  flag=true
  getproduct(){
    this.serveOrder.getOrderDetails(this.id).subscribe((res)=>{
      this.res = res
      console.log(res);
      this.flag=true
    })
  }

  confirm(){

    this.routes.navigateByUrl(`shop/orders/confirmOrder${this.getSortedUrl([['id',(this.res._id)]])}`);
    

  }
  getSortedUrl(controlValues : any[]) : string
  {
    console.log(controlValues);
    
    let sortedUrl : string = '' ;
    let flag : boolean = false ;

    for(let index of controlValues)
    {
      if(index[1])
      {
        sortedUrl += ((flag) ? '&' : '?' ) + index[0] + '=' + index[1] ;
        if(!flag)
          flag = true ;
      }
    }
    
    return sortedUrl ;
  }
  cancelOrder(){
    console.log(this.res._id);
    this.flag=false

    this.serveOrder.cancelOrder(this.res._id).subscribe((res)=>{
      console.log(res);
      this.getproduct();
      
    },err=>{
      console.log(err);
      
    })
  }

}
