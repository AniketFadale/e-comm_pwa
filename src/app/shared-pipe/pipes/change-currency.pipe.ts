import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeCurrency'
})
export class ChangeCurrencyPipe implements PipeTransform {

  transform(value: string, args: string): any {
    let y = args
    // return x;
    if(y == '$'){
      let x = (value)+' '+ args
      return x
    }else if(y == '₹'){
      let x = args + ' ' + (value)
      return x
    }
    else if(y == '€'){
      let x = (value)+ ' ' + args
      return x
    }else if(y == '£'){
      let x = (value)+ ' ' + args
      return x
    }else{
      console.log('not found');
      
      return '₹ ' + value  
    }
  }

}
