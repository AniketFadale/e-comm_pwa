import { TestBed } from '@angular/core/testing';

import { ShopServiceService } from './shop-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ShopServiceService', () => {
  let service: ShopServiceService;
  let httptestoControl :HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({

      declarations:[],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        
      ]
    });
    service = TestBed.inject(ShopServiceService);
    httptestoControl = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should createOrder',()=>{
    service.createOrder({}).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/orders`);
  
    expect(request.request.method).toBe('POST');
  })
  it('should ConfirmOrder',()=>{
    let id ='1234'
    service.ConfirmOrder({},id).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/orders/confirm/${id}`);
  
    expect(request.request.method).toBe('PUT');
  })
   it('should getAllOrders',()=>{
    let id ='1234'
    service.getAllOrders({}).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/orders`);
  
    expect(request.request.method).toBe('GET');
  })
   it('should getOrderDetails',()=>{
    let id ='1234'
    service.getOrderDetails(id).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/orders/${id}`);
  
    expect(request.request.method).toBe('GET');
  })
  it('should cancelOrder',()=>{
    let id ='1234'
    service.cancelOrder(id).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/orders/cancel/${id}`);
  
    expect(request.request.method).toBe('PATCH');
  })
  
});
