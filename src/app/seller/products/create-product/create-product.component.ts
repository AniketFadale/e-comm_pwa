import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
htmlContent: any;
  constructor(private serve :StoreAtURLService,private getdata:GetdataService,private toast : ToastrService){
    getdata.setNav(false);

    // serve.getAllProducts(this.product).subscribe((res)=>{
    //   console.log(res);
      
    // },error=>{
    //   console.log(error);
    // })
  }
  product=<any>{
    name: '' ,
    description: '' ,
    
    price: 0,
  };
  uploadedImg!:any
  Img:any



  
  addProduct(product:any){
    console.log(product);
    
    console.log(this.uploadedImg);
    this.uploadedImg=this.files
    const imageFormData = new FormData();
    this.uploadedImg.map((data:any)=>{
      
      imageFormData.append('images', data);
    })
    
    imageFormData.append('name', product.value.name);
    imageFormData.append('description', product.value.description);
    imageFormData.append('price', product.value.price);
    // console.log('after add',this.product.images);
    // this.product.name = product.name;
    // this.product.description = product.description;
    // this.product.price = product.price;
    
    console.log(this.product);
    this.serve.addProduct(imageFormData).subscribe((res)=>{
      console.log(res);
      this.toast.success('Added successfully','Image');
      this.files = [];
    },error=>{
      console.log(error);
      this.toast.error(' Failed','Image')
    })
    product.reset();

  }
  storeImg(event: any){
   let temp =event.target.files;
   this.uploadedImg = Object.values(temp);
   
  //   let file = event.target.files[0];
  //   let exImg: string | ArrayBuffer | null
  // let reader = new FileReader();

  // reader.readAsText(file);

  // reader.onload = function() {
  //   exImg =reader.result;
  //   // console.log(exImg);
  //   // console.log(reader.result);

    
  // };
  // reader.onerror = function() {
  //   console.log(reader.error);
  // };
  // setTimeout(() => {
  //   this.product['images'] =exImg;
    // console.log('baher',exImg);
  // }, 1000);
  // this.product['images'] =reader.result;
  // console.log(exImg);
    // console.log(this.uploadedImg);
  }
  files: File[] = [];

onSelect(event:any) {
  console.log(event);
  this.files.push(...event.addedFiles);

  
}

onRemove(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

// demoFun(val:any){
//   console.log(val)
// }

}
