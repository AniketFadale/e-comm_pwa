import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';

@Injectable({
  providedIn: 'root',
})
export class GetCutomerLoginService {
  constructor(private getdata:GetdataService) {}
  getCustomerToken() {
    return JSON.parse(localStorage.getItem('customerLogin') || '[]');
  }
  setCustomerToken(token: string) {
    localStorage.setItem('customerLogin', JSON.stringify(token) || '[]');
  }
  clearLocal() {
    this.getdata.shop.next(false)

    localStorage.setItem('customerLogin', JSON.parse('[]'));
  }

  currency = new BehaviorSubject <string>('₹')
 
}
