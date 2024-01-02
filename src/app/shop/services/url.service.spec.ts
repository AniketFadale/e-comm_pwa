import { TestBed } from '@angular/core/testing';

import { UrlService } from './url.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UrlService', () => {
  let service: UrlService;
  let httptestoControl :HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]

    });
    service = TestBed.inject(UrlService);
    httptestoControl = TestBed.inject(HttpTestingController)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getShopProducts',()=>{
    let params = {
      sortBy: 'default' ,
      limit: 10,
      page: 1,
    }
    service.getShopProducts(params).subscribe((res:any)=>{
      expect(res).toBe({})

    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/products?sortBy=${params.sortBy}&limit=${params.limit}&page=${params.page}`);

    expect(request.request.method).toBe('GET');
  })

  it('should getOneProduct',()=>{
    let id = 'abcd'
    service.getOneProduct(id).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/products/${id}`);
  
    expect(request.request.method).toBe('GET');
  })


  it('should registerCustomer',()=>{
    service.registerCustomer({}).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/auth/register`);
  
    expect(request.request.method).toBe('POST');
  })
  
  it('should loginCustomer',()=>{
    service.loginCustomer({}).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/auth/login?captcha=false`);
  
    expect(request.request.method).toBe('POST');
  })
  it('should getSelf',()=>{
    service.getSelf().subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/shop/auth/self`);
  
    expect(request.request.method).toBe('GET');
  })
  it('should updateCustomerProfile',()=>{
    service.updateCustomerProfile({}).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/update-profile`);
  
    expect(request.request.method).toBe('PATCH');
  })
  it('should updateCustomerProfilePhoto',()=>{
    service.updateCustomerProfilePhoto({}).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/profile-picture`);
  
    expect(request.request.method).toBe('POST');
  })
   it('should RemoveCustomerProfilePhoto',()=>{
    service.RemoveCustomerProfilePhoto().subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/profile-picture`);
  
    expect(request.request.method).toBe('DELETE');
  })
   it('should GetSavedAddress',()=>{
    service.GetSavedAddress().subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/address`);
  
    expect(request.request.method).toBe('GET');
  })
   it('should AddNewAddress',()=>{
    service.AddNewAddress({}).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/address`);
  
    expect(request.request.method).toBe('POST');
  })
    it('should UpadateAddress',()=>{
      let id ='abcd'
    service.UpadateAddress({},id).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/address/${id}`);
  
    expect(request.request.method).toBe('PUT');
  })
     it('should DeleteAnAddress',()=>{
      let id ='abcd'
    service.DeleteAnAddress(id).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/address/${id}`);
  
    expect(request.request.method).toBe('DELETE');
  })
     it('should ChangePassword',()=>{
      let id ='abcd'
    service.ChangePassword({}).subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/auth/change-password`);
  
    expect(request.request.method).toBe('POST');
  })
       it('should DeleteAccount',()=>{
      let id ='abcd'
    service.DeleteAccount().subscribe((res:any)=>{
      expect(res).toEqual({})
    })
    const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/customers/account`);
  
    expect(request.request.method).toBe('DELETE');
  })
  
});
