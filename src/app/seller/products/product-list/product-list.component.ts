import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { GetCutomerLoginService } from 'src/app/shop/services/get-cutomer-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products:any;
  constructor(private serve:StoreAtURLService,private getCurrency:GetCutomerLoginService,private getdata:GetdataService,private routes:Router){
    
    getCurrency.currency.subscribe((data)=>{
      this.currency=data
    })
    this.callData();
    getdata.setNav(false);
  }
  currency!:string
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
    console.log('call data',this.params);
    
    this.serve.getAllProducts(this.params).subscribe((res:any)=>{
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

  // to udate or edit data of product
  upadteProduct(){
    this.serve.updateProduct(this.products?.results[this.index]?._id,this.upadateParams).subscribe((res)=>{
      console.log(res);
      this.callData();
      
    },error=>{
      console.log(error);
      
    })

  }
  // to delete data of the product
  deleteProduct(index:any){
    Swal.fire({
      title: 'Do you want to Delete Product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serve.deleteProduct(this.products?.results[index]._id).subscribe((res:any)=>{
          console.log(res);
          this.products?.results.splice(index,1);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          
        },(error:any)=>{
          console.log(error);
          
        })
       
      }
    })
    console.log(this.products?.results[index]);
    
    // this.serve.deleteProduct(this.products.results[index]._id).subscribe((res)=>{
    //   console.log(res);
    //   this.products.results.splice(index,1);
      
    // },error=>{
    //   console.log(error);
      
    // })
  }
  onTableDataChange(pageNumber:any){
    this.params.page=pageNumber;
    this.callData();
  }
  saveIndex(index:any){
    this.index = index;
    this.upadateParams.name=this.products?.results[index].name;
    this.upadateParams.description=this.products?.results[index].description;
    this.upadateParams.price=this.products?.results[index].price;
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
      this.serve.getAllProducts(this.newparams).subscribe((res:any)=>{
        this.products = res;
        this.total=res.totalResults;
        console.log(res);
      },error=>{
        console.log(error);
      })
    }
  }

  showProduct(index:any){
    // alert(index)
    this.routes.navigate(['products/product'],{queryParams:{id:this.products.results[index]._id}})
    
  }
}
