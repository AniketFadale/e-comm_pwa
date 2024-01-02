import { Component } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { ShopServiceService } from '../../services/shop-service.service';
import { Store } from '@ngrx/store';
import { del, editToCart } from '../../counter.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetCutomerLoginService } from '../../services/get-cutomer-login.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  constructor(
    private serve: UrlService,
    private serveOrder: ShopServiceService,
    private store: Store<any>,
    private routes:Router,
    private toast :ToastrService,
    private getCurrency : GetCutomerLoginService
  ) {
    var el: any = document.querySelector('.grecaptcha-badge');
    if(el){
      el.style.display = 'none';
    }
    getCurrency.currency.subscribe((data)=>{
      this.currency = data;
    })
    this.serve.GetSavedAddress().subscribe(
      (res) => {
        // console.log(res);
        this.address = res;
        this.add = this.address[0]
        this.add1 = this.add?.street+','+this.add?.addressLine2 +','+this.add.city + ',' + this.add?.state+','+this.add?.pin 
      },
      (err) => {
        console.log(err);
      }
    );
    this.getCartElement();
  }
  withDiscount!:any;
  currency !:string 
  addIndex=0;
  add1:string=''
  add:any;
  orderResponse:any
  getlocal: any;
  total :number = 0;
  address: any = [];
  cartElement: any = [];
  //  product={
  //   productId: '',
  //   name: '',
  //   price: 0,
  //   qty: 0,
  //   subTotal: 0,
  // }
  payload:any = {
    items: [],
    deliveryFee: 40,
    total: 0,
    address: {
      street: '',
      addressLine2: '',
      city: '',
      state: '',
      pin: '',
    },
  };
 
  getCartElement() {
    this.store.select('users').subscribe((data) => {
     // console.log(data.users,"From gGetCart")
      this.cartElement = JSON.parse(JSON.stringify(data.users) );
      console.log(this.cartElement,"From Ser")
      // if (this.cartElement.length == 0) {
      //   this.getCartElementFromLocal();
      // } else {
      //   console.log('1');
      // }
      // console.log(this.cartElement);
    });
  }

  MakePayment() {
    console.log(this.payload.items);
    this.total=0;
    this.withDiscount = 0;
    for(let i=0 ;i< this.cartElement.length ; i++){
      let product ={
        name : '',
        productId:'',
        price: 0,
        qty : 0,
        subTotal : 0
      }
      product.name = this.cartElement[i].name;
      product.productId = this.cartElement[i]._id;
      // product.price = this.cartElement[i].price;
      product.qty = this.cartElement[i].quantity;
      // product.subTotal = this.cartElement[i].quantity * this.cartElement[i].price;
      this.total = this.total + product.subTotal;
      if(this.cartElement[i].deal){
        this.withDiscount += this.cartElement[i].deal.price * this.cartElement[i].quantity;
        product.price = this.cartElement[i].deal.price;
        product.subTotal = this.cartElement[i].quantity * this.cartElement[i].deal.price;

      }else{
        this.withDiscount = this.withDiscount + product.subTotal;
        product.price = this.cartElement[i].price;
        product.subTotal = this.cartElement[i].quantity * this.cartElement[i].price;

      }
     
      this.payload.items.push(product)
      console.log(this.payload);
      
     
    }
      this.payload.address.street = this.address[this.addIndex].street
      this.payload.address.addressLine2 = this.address[this.addIndex].addressLine2
      this.payload.address.city = this.address[this.addIndex].city
      this.payload.address.state = this.address[this.addIndex].state
      this.payload.address.pin = this.address[this.addIndex].pin
      this.payload.total = this.withDiscount
    console.log(this.payload);
    
  
    this.serveOrder.createOrder(this.payload).subscribe((res)=>{
      console.log(res);
      this.orderResponse = res
   
      this.toast.success('Successfully','Order created')
     console.log(this.orderResponse.order._id);
     this.store.dispatch(del())
      this.routes.navigateByUrl(`shop/orders/confirmOrder${this.getSortedUrl([['id',(this.orderResponse.order._id)]])}`);

    },err=>{
      console.log(err);
      
    })
  }

  getSortedUrl(controlValues : any[]) : string
  {
    // console.log(controlValues);
    
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

  f1(i:number){
    this.addIndex= i ;
    
  }  
}
