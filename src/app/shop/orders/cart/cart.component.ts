import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from '../../counter.state';
import { TruncPipe } from '../../products/pipe/trunc.pipe';
import { trunc } from '../../products/products.module';
import { addToCart, editToCart } from '../../counter.actions';
import { Router } from '@angular/router';
import { GetCutomerLoginService } from '../../services/get-cutomer-login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private store :Store<any>,private routes:Router,private getCurrency : GetCutomerLoginService){
    getCurrency.currency.subscribe((data)=>{
      this.currency = data
    })
    this.GetCartElements()
    
  }
  currency!: string 
  getlocal:any
  Total_price=0
  WithDiscountPrice=0
  CartProducts:any=[{}]
  // Cart:any={};


  GetCartElements(){

    this.store.select('users').subscribe(data=>{
      // this.Cart =data
      // console.log(this.Cart.users);
      this.CartProducts = JSON.parse(JSON.stringify(data.users)||'[]')
      console.log(this.CartProducts);

      // if(this.CartProducts.length == 0){
      //   this.getCartElementFromLocal()
      //   console.log('getlocal');
        
      // }else{
      //     // console.log('1');
          
      // }
      
      localStorage.setItem('cart',JSON.stringify(data.users))
    })
    this.calculateTotal()
  } 
  removeElement(index:any){
    // alert(index);
    // console.log(this.CartProducts,'Before');
    
    if(this.CartProducts.length==1){
      let empty: any[] = []
      localStorage.setItem('cart',JSON.stringify(empty))
    }
    this.CartProducts.splice(index,1);
    // console.log(cart);
    this.setlocal();
    this.calculateTotal();

    
  } 



  increment(index:any){
    // alert(index)
    this.CartProducts[index].quantity+=1;
    // console.log(this.CartProducts[index].quantity);
    
    this.calculateTotal()
    this.setlocal()
  }


  decrement(index:number){
    if(this.CartProducts[index].quantity>1){
      this.CartProducts[index].quantity-=1
      // console.log(this.CartProducts[index].quantity);
      this.calculateTotal()
      this.setlocal()
    }
  }

  setlocal(){
    console.log(this.CartProducts);
    
    this.store.dispatch(editToCart({data:this.CartProducts}))
    // this.store.select('users').subscribe(data=>{
    //   console.log(data);
    //   localStorage.setItem('cart',JSON.stringify(data.users))
      
    // })
  }

  calculateTotal(){
    this.Total_price = 0
    this.WithDiscountPrice = 0
    for(let i=0 ;i< this.CartProducts.length;i++){

      this.Total_price += this.CartProducts[i].quantity * this.CartProducts[i].price; 
      if(this.CartProducts[i].deal){
        this.WithDiscountPrice += this.CartProducts[i].quantity* this.CartProducts[i].deal.price;
      }else{
        this.WithDiscountPrice += this.CartProducts[i].quantity* this.CartProducts[i].price;
      }
    }
    
  }

  getCartElementFromLocal(){
    this.getlocal = JSON.parse(localStorage.getItem('cart')||'[]')
    if(this.getlocal.length != 0){

      this.store.dispatch(editToCart({data:this.getlocal}))
    }
  }


  PlaceOrder(){
    if(localStorage.getItem('customerLogin')){

      console.log('yes login')    
      this.routes.navigate(['/shop/orders/createOrder'])

    }else{
      console.log('not login');
      this.routes.navigate(['/shop/auth/login'],{queryParams:{return : '/shop/orders/createOrder'}})

    }
  }
}
