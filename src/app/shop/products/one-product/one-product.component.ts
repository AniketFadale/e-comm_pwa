import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
// import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { UrlService } from '../../services/url.service';
import { GetCutomerLoginService } from '../../services/get-cutomer-login.service';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent {

  constructor(private getcurrency : GetCutomerLoginService, private route: ActivatedRoute,private serve:UrlService,private getdata:GetdataService,private toast:ToastrService) {
    getcurrency.currency.subscribe((data)=>{
      this.currency = data
      console.log(this.currency);
      
    })
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

   
      this.route.queryParamMap?.subscribe((params:any)=> {
        // console.log(params.get('id'));
        this.productId = params.get('id');
        this.getProduct()
      })

   
}
  getProduct(){
    this.serve.getOneProduct(this.productId).subscribe((res)=>{
      console.log(res);
      this.product=res;
      this.mainImage=this.product.images[0].url;
    },error=>{
      console.log(error);
      
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
    console.log(event,ex.clientHeight);
    if(this.show){
      
      this.fig =document.getElementById('magnifying_area');
      // console.log(this.fig.clientHeight);
      if(this.fig){
        this.fig.style.transform='translate(-50%,-50%) scale(2)'
        // console.log(ex.naturalWidth)
        this.fig.style.backgroundPositionX = -this.event.offsetX+150+(ex.clientWidth/2)+"px" ;
        this.fig.style.backgroundPositionY = -this.event.offsetY+(ex.clientHeight/2)+"px" ;
      }  
    }
  }
  
  imgzoomout(x:any){
    // console.log('x==>',x.ElementReff);
    this.show=false
  }
  // f1(e:any){
  //   console.log(e.naturalHeight);
  // }



  // new veriables
  flag:boolean=false
  imgH:any;
  imgW:any;
  posX:any;
  posY:any;
  img2:any
  // temp:any=document.querySelector('#imgId2') as HTMLElement
  f1(img:any,e:any){
    this.flag=true
    var tem=document.getElementById('imgId2')
    console.log(tem);
    
    // console.log(e.clientX - img.offsetLeft - img.x);
    // console.log(e.offsetX)
    // console.log(img.);
    this.posX=e.offsetX/img.offsetWidth*100 
    this.posY=e.offsetY/img.offsetHeight*100
    console.log('x=',this.posX+'%' ,'y=',this.posY+'%');
    this.imgH = img.offsetHeight;
    this.imgW=img.offsetWidth
    if(tem){
      console.log('hhhhhhhhhhhh');
      // tem.style.left='25%';
      tem.style.transform = 'translate(-'+((this.posX))+'% , -'+(this.posY)+'%) scale(2)'
    }
    
  }
  f2(img:any,e:any){
    var tem=document.getElementById('imgId2')
    if(tem){

      tem.style.transform = 'translate(-50% , -50%) scale(1)'
    }
    this.flag=false

  }
}

