import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { GetdataService } from '../../localStorageService/getdata.service';
import Swal from 'sweetalert2';
import { GetCutomerLoginService } from 'src/app/shop/services/get-cutomer-login.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent {

  constructor(private getcurrency :GetCutomerLoginService,private activatedRoute :ActivatedRoute,private serve : StoreAtURLService,private getdata:GetdataService){
    activatedRoute.queryParams.subscribe((val:any)=>{
      console.log(val.id);
      this.id=val.id
    })
    getcurrency.currency.subscribe((data)=>{
      this.currency =data
    })
    getdata.setNav(false);

    this.callData()
  }
  currency!:string
  id:any
  ProductData:any
  callData(){
    this.serve.getOrderDetails(this.id).subscribe((res:any)=>{
      console.log(res);
      this.ProductData = res[0]
      
    })
  }

  deliver(){
    this.serve.toDeliverOrder(this.ProductData._id).subscribe((res)=>{
      console.log(res);
      this.callData()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product Deliverd',
        showConfirmButton: false,
        timer: 1500
      })
      
    },err=>{
      console.log(err);
      
    })
  }
  dispatch(){
    this.serve.toDispatchOrder(this.ProductData._id).subscribe((res)=>{
      console.log(res);
      this.callData()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product Dispatched',
        showConfirmButton: false,
        timer: 1500
      })
      
    },err=>{
      console.log(err);
      
    })
  }
  cancel(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cancelled!',
          'Order has been Cancelled',
          'success'
        )
        this.serve.toCancelOrder(this.ProductData._id).subscribe((res)=>{
          console.log(res);
          this.callData()
        },err=>{
          console.log(err);
          
        })
      }
    })
   
  }

}
