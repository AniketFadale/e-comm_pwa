import { Component } from '@angular/core';
import { ShopServiceService } from '../../services/shop-service.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { calculateDragImageOffset } from 'ngx-drag-drop/lib/dnd-utils';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent {
  constructor(private serveShop : ShopServiceService , private toast :ToastrService,private routes:Router,private activatedRoute : ActivatedRoute){
   
    activatedRoute.queryParams.subscribe((val:any)=>{
      // console.log(val.id);
      this.id=val.id
    })
    
    
  }
  ShowCard=true
  CVV:boolean=false
  cvvOfCard:any
  month:any='mm'
  year:any='yyyy'
  Exdate:any
  NOnCard=''
  numLength:boolean=false
  y:string[]=[]
  cardNo:string[]=[]
  numb!:any
  id:any
  paymentData={
    nameOnCard: '' ,
    cardNumber: '' ,
    expiry: '' ,
    cvv: '',
  }
  PaymentByCard(data:any){
    // console.log(data.value);
    let x = this.id
    
    this.paymentData.expiry = data.value.mm + '/' + data.value.yyyy;
    this.paymentData.nameOnCard = data.value.nameOnCard 
    this.paymentData.cardNumber = (data.value.cardNumber).toString()
    this.paymentData.cvv =( data.value.cvv).toString() 

    this.serveShop.ConfirmOrder(this.paymentData,x).subscribe((res)=>{
        // console.log(res);
        this.toast.success('Placed Successfully','Order')
        this.routes.navigate(['/shop/orders/OrderHistory']);
    },err=>{
      // console.log(err);
      this.toast.error(err.error.message,'Payment Failed')
    })
  }


  ConfigInput(){
    if(this.numb!=null &&this.numb.toString().length > 16){
      this.numLength=true
    }else{
      this.numLength=false
    }
     if(this.numb!=null){
        
          // console.log((this.numb.toString().length),'else');
          let n = this.numb
          let x = n.toString().length - 1
          this.cardNo = (n.toString()).split('')   
          // console.log(this.cardNo,'hgjhhg');
          if(this.cardNo.length>x){
            this.cardNo.splice(x+1)
            // console.log('card',this.cardNo);
      }
      }
      else{
        this.cardNo = []
        // console.log(this.cardNo);    
      }
    }
    

    configCvv(){
      if(this.cvvOfCard !=null && this.cvvOfCard.toString().length >3){
        // console.log(this.cvvOfCard.toString().length);
        
        this.CVV = true;
      }else{
        this.CVV=false;
      }
    }
    
}
