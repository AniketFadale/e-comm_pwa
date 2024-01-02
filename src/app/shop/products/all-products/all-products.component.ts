import { Component } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { counterState } from '../../counter.state';
import { addToCart, editToCart } from '../../counter.actions';
import Swal from 'sweetalert2';
import { GetCutomerLoginService } from '../../services/get-cutomer-login.service';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  mess!:any
  getlocal:any
  products:any;
  constructor(private getcurrency : GetCutomerLoginService,private serve:UrlService,private routes:Router,private store :Store<any>){
    this.callData();
    // getdata.setNav(false);
    
    getcurrency.currency.subscribe((data)=>{
      this.currency = data
    })
    var el: any = document.querySelector('.grecaptcha-badge');
    if(el){
      
      el.style.display = 'none';
    }
    // console.log('all product');
    this.getCartElementFromLocal()
    
  }

  currency :string='₹';
  total:any;
  SearchedName:any='';
  params=<any>{
    sortBy: 'default' ,
    limit: 10,
    page: 1,
  }
  upadateParams={
    name:'',
    description:'',
    price:0
  }
  index:number=0;
  updatedImg:any;
  callData(){
    // console.log('call data',this.params);
    
    this.serve.getShopProducts(this.params).subscribe((res:any)=>{
      this.products = res;
      this.total=res.totalResults;
      console.log(res);
    },error=>{
      console.log(error);
    })
  }
  callDataWithLimit(){
    this.params.page=1;
    this.callData()
  }

  onTableDataChange(pageNumber:any){
    this.params.page=pageNumber;
    this.callData();
  }
  saveIndex(index:any){
    this.index = index;
    this.upadateParams.name=this.products.results[index].name;
    this.upadateParams.description=this.products.results[index].description;
    this.upadateParams.price=this.products.results[index].price;
    // alert(this.upadateParams.name)
  }
  storeUpdatedImg(event:any){
    this.updatedImg =event.target.files[0];
    
  }
  newparams:any={}
  
  
  
  sortByName(){
    if(this.SearchedName==''){
      
      this.callData()
    }
    else{
      this.params.page=1;
      this.newparams["limit"] = this.params.limit;
      this.newparams["page"] = this.params.page;
      this.newparams["sortBy"] = this.params.sortBy;
      this.newparams["name"] = this.SearchedName;
      this.serve.getShopProducts(this.newparams).subscribe((res:any)=>{
        this.products = res;
        this.total=res.totalResults;
        // console.log(res);
      },error=>{
        console.log(error);
      })
    }
  }

  showProduct(index:any){
    // alert(index)
    this.routes.navigate(['shop/product'],{queryParams:{id:this.products.results[index]._id}})
    
  }


  getCartElementFromLocal(){
    this.getlocal = JSON.parse(localStorage.getItem('cart')||'[]')
    this.store.dispatch(editToCart({data:this.getlocal}))
  }

  AddToCart(index:number){
   
    this.products.results[index].quantity = 1;
    this.store.dispatch(addToCart(this.products.results[index]))

    this.store.select('users').subscribe(data=>{
      // console.log(data);
      localStorage.setItem('cart',JSON.stringify(data.users))
      
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to Cart',
      showConfirmButton: false,
      timer: 1500
    })
  }

  // to change currency type 
  changeCurrency(){
    console.log(this.currency);
    
    this.getcurrency.currency.next(this.currency)
  }
}

