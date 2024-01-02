import { Directive ,ElementRef, Input, OnInit} from '@angular/core';
import { timer } from 'rxjs';
import { GetCutomerLoginService } from 'src/app/shop/services/get-cutomer-login.service';

@Directive({
  selector: '[appDealDirective]'
})
export class DealDirectiveDirective implements OnInit{
  @Input ('deal') deal !:any;
  @Input ('price') price !:any;
  

  constructor(private el :ElementRef,private getCurrency : GetCutomerLoginService) {
    // console.log(el.nativeElement.innerHTML);
   
    
    
  }
  timer:any
  currency:any
  ngOnInit(): void {

    
    this.getCurrency.currency?.subscribe((data)=>{
      this.currency = data
    })
    
    if(this.deal){
      
      this.timer = new Date(this.deal.ends).getTime()      
      var x = setInterval(() => {
        var now = new Date().getTime();
        var distance = this.timer - now;
          // console.log( distance);
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let a = this.deal.price;
        
      this.el.nativeElement.innerHTML= '<sup>'+ this.deal.discount+'Off</sup> <br><big class="text-primary"> '+a+' '+this.currency +'</big><br>'+ '<small class="text-danger">Ends In :' + days + "d " + hours + "h "
      + minutes + "m " + seconds + "s </small>"
        if (distance < 0) {
          clearInterval(x);
          
          this.el.nativeElement.innerHTML = '<br>Offer Expired'
        }
      }, 1000);   
    }
  }
}
