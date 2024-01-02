import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from '../../services/shop-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  constructor(private routes :Router,private serveOrder : ShopServiceService){
  }
  ngOnInit(){
    this.callData();
    // alert('')
  }
  res:any
  orderData:any
  callData(){
    this.serveOrder.getAllOrders(this.parameters).subscribe((res)=>{
      // console.log(res);
      this.res = res
      this.orderData = this.res.results
      console.log(this.res);
      
      
    })
  }
  parameters = {
    limit: 10,
    page: 1,
    
  };
  showDetails(index:number){
    console.log(index);
    let id = this.orderData[index]._id
    this.routes.navigateByUrl(`shop/orders/OrderDetails${this.getSortedUrl([['id',this.orderData[index]._id]])}`);
    // fgsgsj
    
    
    
  }

  getSortedUrl(controlValues : any[]) : string
  {
    
    
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

  NumOfOrdersTOShow(){
    this.callData();
  }


  onTableDataChange(event:any){
    this.parameters.page = event
    this.callData()
  }
  
}
