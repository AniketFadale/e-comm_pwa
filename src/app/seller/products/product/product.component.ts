import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { ToastrService } from 'ngx-toastr';
import { offset } from '@popperjs/core';
import { transition } from '@angular/animations';
import Swal from 'sweetalert2';
import { GetCutomerLoginService } from 'src/app/shop/services/get-cutomer-login.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  
  constructor(private GetCurrency : GetCutomerLoginService, private route: ActivatedRoute,private serve:StoreAtURLService,private getdata:GetdataService,private toast:ToastrService) {
    getdata.setNav(false);
    setTimeout(() => {
      
      GetCurrency.currency.subscribe((data)=>{
        this.currency = data
      })
    }, 10);
  }
  currency!:string
  selectedImage:any=[];
  selectImg:any;
  temp:any='../../../assets/loading2.jpg';
  uploadedImg:any[]=[];
  mainImage:any='../../../assets/loading2.jpg'
 productId:string ='';
  product:any;
  ngOnInit(): void {
      
      this.route.queryParams?.subscribe((params:any)=> {
        console.log(params['id']);
        this.productId = params['id'];
        this.getProduct()
      })
}
  getProduct(){
    this.serve.getSingleProduct(this.productId).subscribe((res:any)=>{
      console.log(res);
      this.product=res;
      console.log(this.product,"From Response")
      this.mainImage=this.product?.images[0]?.url;
    },(error:any)=>{
      console.log(error);
      
    })
  }



  AddMultipleIMages(){
    const imageFormData = new FormData();
    
    for(let i of this.uploadedImg)
    {
      imageFormData.append('images', i);

    }
    console.log(imageFormData);
    
    this.serve.updateProductImage(this.productId,imageFormData).subscribe((res:any)=>{
      console.log(res);
      this.temp=res.images
      this.toast.success('Successfully','Images Added')
    },error=>{
      console.log(error);
      this.toast.error('Failed','Image Update')
    },()=>{
      this.getProduct();
    })
  }
  storeImg(event:any){
    let temp =event.target.files;
    for(let img of temp)
    {

      this.uploadedImg.push(img);
    }
   console.log(this.uploadedImg);
   
    
  }
  changeImg(event:any){
    // console.log(event.target.src);
    this.mainImage=event.target.src;
  }
  Delete(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.selectedImage.length!= 0){
          const imageFormData = new FormData();
          for(let i of this.selectedImage)
          {
            imageFormData.append('delete', i);
      
          }
    
          this.serve.deleteProductImage(this.productId,imageFormData).subscribe((res)=>{
            console.log(res);
            this.selectedImage=[]
            Swal.fire(
              'Deleted!',
              'Your Image has been deleted.',
              'success'
            )
            this.toast.error('Deleted')
          },error=>{
            console.log(error);
            this.toast.error(error.messeage)
          },()=>{
            this.getProduct();
          })
        }
        else{
          alert('Please select the image')
        }
        
        
      }
    })
    // if(this.selectedImage.length!= 0){
    //   const imageFormData = new FormData();
    //   for(let i of this.selectedImage)
    //   {
    //     imageFormData.append('delete', i);
  
    //   }

    //   this.serve.deleteProductImage(this.productId,imageFormData).subscribe((res)=>{
    //     console.log(res);
    //     this.selectedImage=[]
    //     this.toast.error('Deleted')
    //   },error=>{
    //     console.log(error);
    //     this.toast.error(error.messeage)
    //   },()=>{
    //     this.getProduct();
    //   })
    // }
    // else{
    //   alert('Please select the image')
    // }
  }
  
  select(index:any,event:any){
    let flag =true
    if(this.selectedImage.length == 0){
      this.selectedImage.push( this.product.images[index].public_id)
        // console.log(this.selectedImage);
    }else{

      for( let i=0;i<this.selectedImage.length;i++)
      {
        if(this.selectedImage[i]==this.product.images[index].public_id){
          
          this.selectedImage.splice(i,1);
          console.log('removed', index);
          flag = false
          
        }
        
      }
      if(flag){
  
        this.selectedImage.push( this.product.images[index].public_id);
        console.log(this.selectedImage);
      }
    }
    this.selectImg=this.product.images[index].public_id;
    // console.log(event.target);
    
   
  }
  f:boolean=false
  selectborder(i:any){
  
    this.f=false
    for(let j =0 ;j<this.selectedImage.length;j++)
    {
      if(this.selectedImage[j] == this.product.images[i].public_id){
        // console.log(i);
        
        this.f=true;
      }
    }
    return this.f
  }
  show:boolean=false;
  img:any
  fig:any;
  event:any
  imgzoom(ex:any,event:any){
    this.show=true
    this.event = event
    // console.log(event,ex.clientHeight);
    if(this.show){
      
      this.fig =document.getElementById('magnifying_area');
      // console.log(this.fig.clientHeight);
      if(this.fig){
        this.fig.style.transform='translate(-25%,-25%) scale(1)'
        // console.log(ex.naturalWidth)
        this.fig.style.backgroundPositionX = -this.event.offsetX-150+(ex.clientWidth/3)+"px" ;
        this.fig.style.backgroundPositionY = -this.event.offsetY-100+(ex.clientHeight/3)+"px" ;
      }  
    }
  }
  
  imgzoomout(x:any){
    console.log('x==>',x.ElementReff);
    this.show=false
    if(this.fig){

      this.fig.style.transform='translate(-50%,-50%) scale(1)'
  }
  }
  f1(e:any){
    // console.log(e.naturalHeight);
  }
}
