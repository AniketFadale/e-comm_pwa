import { Component } from '@angular/core';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { Router } from '@angular/router';
import { GetdataService } from '../../localStorageService/getdata.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  constructor(private serve : StoreAtURLService,private routes:Router,private getdata:GetdataService){
    getdata.setNav(false);
    this.callData()
  }
  res:any
  orders:any
  parameters = {
    limit: 10,
    page: 1,
    
  };
  orderData:any
  callData(){
    this.serve.getAllOrders(this.parameters).subscribe((res)=>{
      console.log(res);
      this.res = res
      this.orderData = this.res.results
    })
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


  showDetails(index:number){
      console.log(index)
      this.routes.navigateByUrl(`/orders/OrderData${this.getSortedUrl([['id',this.orderData[index]._id]])}`);
  }

  NumOfOrdersTOShow(){
    this.callData();
  }


  onTableDataChange(event:any){
    this.parameters.page = event
    this.callData()
  }
  
}
