import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import{HttpClientTestingModule,
  HttpTestingController,}  from '@angular/common/http/testing';
import { StoreAtURLService } from './store-at-url.service';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../guards/auth.guard';
import { AppComponent } from 'src/app/app.component';
import { of, throwError } from 'rxjs';

describe('StoreAtURLService', () => {
  let service: StoreAtURLService;
  let httpclient : HttpClient
  let httptestoControl :HttpTestingController

  let guard: AuthGuard
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[StoreAtURLService]
    });
    service = TestBed.inject(StoreAtURLService);
    httptestoControl = TestBed.inject(HttpTestingController)
    // component = new AppComponent(StoreAtURLService);
  });

  
  it('should update company info', () => {

    let payload = {
      name: 'Angular minds - ap',
      email: 'aniket@gmail.com',
    };
    const mockResponse = {
      _id: '6446638a49ce72c17a34091e',
      name: 'Angular Minds - ap',
      email: 'aniket@gmail.com',
      deleted: false,
      createdAt: '2023-04-24T11:10:02.275Z',
      updatedAt: '2023-05-31T06:55:40.435Z',
    };

    service.CompanyInfo(payload).subscribe((res:any)=>{
      expect(res).toEqual(mockResponse);
    });

    const request = httptestoControl.expectOne('https://shop-api.ngminds.com/users/org');

    expect(request.request.method).toBe('PATCH');
    request.flush(mockResponse);
  });

  it('should get user', () => {

   
    const mockResponse = {
      "_id": "64467fa349ce72c17a340a5a",
      "name": "aniket fadale",
      "_org": {
          "_id": "64467fa349ce72c17a340a57",
          "name": "Angular minds",
          "email": "angular@gmail.com"
      },
      "email": "aniket123@gmail.com",
      "role": "admin",
      "isEmailVerified": true,
      "deleted": false,
      "createdAt": "2023-04-24T13:09:55.114Z",
      "updatedAt": "2023-06-14T06:35:59.722Z"
  };

    service.getUser().subscribe((res:any)=>{
      expect(res).toEqual(mockResponse);
    });

    const request = httptestoControl.expectOne('https://shop-api.ngminds.com/auth/self');

    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  it('should LogIn User', () => {

    let payload = {
      captcha:'dsjdhsa4336ldjk',
      name: 'Aniket fadale - ap',
      email: 'aniket@gmail.com',
    };
    const mockResponse = {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDQ2N2ZhMzQ5Y2U3MmMxN2EzNDBhNWEiLCJpYXQiOjE2ODY3NDMwMzcsImV4cCI6MTY4NjgyOTQzNywidHlwZSI6ImFjY2VzcyJ9.Wonir9UH7fKELE_w3OyTDePFNoktV80HHFHG07n58vk",
      "expires": "2023-06-15T11:43:57.066Z",
      "user": {
          "_id": "64467fa349ce72c17a340a5a",
          "name": "aniket fadale",
          "_org": {
              "_id": "64467fa349ce72c17a340a57",
              "name": "Angular minds",
              "email": "angular@gmail.com"
          },
          "email": "aniket123@gmail.com",
          "role": "admin",
          "isEmailVerified": true,
          "deleted": false,
          "createdAt": "2023-04-24T13:09:55.114Z",
          "updatedAt": "2023-06-14T06:35:59.722Z"
      },
  };

    service.LogPostUser(payload).subscribe((res:any)=>{
      expect(res).toEqual(mockResponse);
    });

    const request = httptestoControl.expectOne('https://shop-api.ngminds.com/auth/login?captcha=false');

    expect(request.request.method).toBe('POST');
    request.flush(mockResponse);
  });


  it('should LogIn User', () => {

    let payload = {
      captcha:'dsjdhsa4336ldjk',
      name: 'Aniket fadale - ap',
      email: 'aniket@gmail.com',
      password : 'jhghdfsdg',
      company : 'Angular minds'
    };
    const mockResponse = {
      "user": {
          "name": "Vundefined",
          "_org": {
              "_id": "6489ac588314b2229dea70bd",
              "name": "am",
              "email": "v1234@gmail.com"
          },
          "email": "v1234@gmail.com",
          "role": "admin",
          "isEmailVerified": false,
          "_id": "6489ac588314b2229dea70c0",
          "deleted": false,
          "createdAt": "2023-06-14T12:02:32.022Z",
          "updatedAt": "2023-06-14T12:02:32.022Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDg5YWM1ODgzMTRiMjIyOWRlYTcwYzAiLCJpYXQiOjE2ODY3NDQxNTIsImV4cCI6MTY4NjgzMDU1MiwidHlwZSI6ImFjY2VzcyJ9.5cFD0r_r0GI0PaUD8hHDbls1F_6Boh28zKJKW-RCtaQ",
      "expires": "2023-06-15T12:02:32.063Z"
  };

    service.RegistrePostUser(payload).subscribe((res:any)=>{
      expect(res).toEqual(mockResponse);
    });

    const request = httptestoControl.expectOne('https://shop-api.ngminds.com/auth/register');

    expect(request.request.method).toBe('POST');
    request.flush(mockResponse);
  });

  
  
  it('should Get All Users', () => {
    
    const mockResponse = 
        {
          "results": [
              {
                  "_id": "64467fa349ce72c17a340a5a",
                  "name": "aniket fadale",
                  "_org": {
                      "_id": "64467fa349ce72c17a340a57",
                      "name": "Angular minds",
                      "email": "angular@gmail.com"
                  },
                  "email": "aniket123@gmail.com",
                  "role": "admin",
                  "isEmailVerified": true,
                  "deleted": false,
                  "createdAt": "2023-04-24T13:09:55.114Z",
                  "updatedAt": "2023-06-14T06:35:59.722Z"
              }
              
              
          ],
          "page": 1,
          "limit": 1,
          "totalPages": 2,
          "totalResults": 9
      
    };
    
  
    service.GetAllUsers({limit :1}).subscribe((res)=>{
      expect(res).toEqual(mockResponse);
    });

    const request = httptestoControl.expectOne(res=> res.method === 'GET' &&res.url==='https://shop-api.ngminds.com/users');

    expect(request.request.method).toEqual('GET');
    request.flush(mockResponse);
  });


  it('should Create New User', () => {
    let payload = {name: "Demo ", role: "user", email: "a5553@gmail.com", password: "Pass@123"}

    let mockResponse={
      "name": "Demo",
      "_org": {
          "_id": "64467fa349ce72c17a340a57",
          "name": "Angular minds",
          "email": "angular@gmail.com"
      },
      "email": "a5553@gmail.com",
      "role": "user",
      "isEmailVerified": false,
      "_id": "6489b3c38314b2229dea7165",
      "deleted": false,
      "createdAt": "2023-06-14T12:34:11.014Z",
      "updatedAt": "2023-06-14T12:34:11.014Z"
  };
  
    service.CreateNewUser(payload).subscribe((res : any)=>{
      expect(res).toEqual(mockResponse);
    });

    const request = httptestoControl.expectOne(res=> res.method === 'POST' &&res.url==='https://shop-api.ngminds.com/users');

    expect(request.request.method).toEqual('POST');
    request.flush(mockResponse);
  });

  it('should Delete User', () => {
    let payload = '6461bf02cf9849ff1f3df47b'  
    service.DeleteUser(payload).subscribe((res : any)=>{
      expect(res).toBeNull
    });
    const request = httptestoControl.expectOne(res=> res.method === 'DELETE' && res.url==='https://shop-api.ngminds.com/users/6461bf02cf9849ff1f3df47b');

    expect(request.request.method).toEqual('DELETE');
    request.flush(null);
  });


  
  it('should Edit Role', () => {
    let payload = '6461bff5cf9849ff1f3df4dd'
    let role = 'user'
    let mockResponse={
      "_id": "6461bff5cf9849ff1f3df4dd",
      "name": "Priyanka Dhake",
      "_org": "64467fa349ce72c17a340a57",
      "email": "dhakepriyanka1616@gmail.com",
      "role": "admin",
      "isEmailVerified": false,
      "deleted": false,
      "createdAt": "2023-05-15T05:15:33.404Z",
      "updatedAt": "2023-06-14T13:03:52.218Z"
  };
  
    service.EditRole(payload , role).subscribe((res : any)=>{
      expect(res).toEqual(mockResponse);
    });

    const request = httptestoControl.expectOne(res=> res.method === 'PATCH' && res.url==='https://shop-api.ngminds.com/users/role/6461bff5cf9849ff1f3df4dd');

    expect(request.request.method).toEqual('PATCH');
    request.flush(mockResponse);
  });


  it('should Edit Info', () =>{
    let payload ={name: "aniket", email: "aniket2332@gmail.com", password: "Pass@123"}
    let id = '6461bff5cf9849ff1f3df4dd'
    let mockResponse = {
      "_id": "6461c201cf9849ff1f3df5c1",
      "name": "aniket",
      "_org": {
          "_id": "64467fa349ce72c17a340a57",
          "name": "Angular minds",
          "email": "angular@gmail.com"
      },
      "email": "aniket2332@gmail.com",
      "role": "admin",
      "isEmailVerified": false,
      "deleted": false,
      "createdAt": "2023-05-15T05:24:17.633Z",
      "updatedAt": "2023-06-14T13:23:13.369Z"
  }
    service.EditInfo(payload , id).subscribe((res:any)=>{
      expect(res).toEqual(mockResponse)
    })
    const request = httptestoControl.expectOne(res=> res.method === 'PATCH' && res.url==='https://shop-api.ngminds.com/users/6461bff5cf9849ff1f3df4dd');

    expect(request.request.method).toEqual('PATCH');
    request.flush(mockResponse);
  })


  it('should Search By Name', () =>{
    let payload ={limit: 1, page: 1, sortBy: "name"}
    let id = 'aniket'
    let mockResponse = {
      "_id": "6461c201cf9849ff1f3df5c1",
      "name": "aniket",
      "_org": {
          "_id": "64467fa349ce72c17a340a57",
          "name": "Angular minds",
          "email": "angular@gmail.com"
      },
      "email": "aniket2332@gmail.com",
      "role": "admin",
      "isEmailVerified": false,
      "deleted": false,
      "createdAt": "2023-05-15T05:24:17.633Z",
      "updatedAt": "2023-06-14T13:23:13.369Z"
  }
    service.SearchByName(id , payload).subscribe((res:any)=>{
      expect(res).toEqual(mockResponse)
    })
    const request = httptestoControl.expectOne(res=> res.method === 'GET' && res.url==='https://shop-api.ngminds.com/users?name=aniket');

    expect(request.request.method).toEqual('GET');
    request.flush(mockResponse);
  })


  it('should change Password', () =>{
    let payload ={new_password: "Pass@1234", old_password: "Pass@1234"}
   
    service.changePassword( payload).subscribe((res:any)=>{
      expect(res).toBeNull
    })
    const request = httptestoControl.expectOne(res=> res.method === 'POST' && res.url==='https://shop-api.ngminds.com/users/auth/change-password');

    expect(request.request.method).toEqual('POST');
    request.flush(null);
  })


  it('should forgot Password', () =>{
    let payload ={email: "aniket123@gmail.com",captcha:"03AL8dmw89hZtbPC_fDowh5XyQ4NhLRJ93YDeatPs2tTBZIqIruS4y9udz5C5NjZdMHrtG3VtacDtW6B8wkrDbeLX9YwzPih2XIHTD2k6vJkYJ7voyj8lobs2KdyYpclxVwV4hGP9qQvaSAIsLEHm5eG9A9YrUAQIL7eYjbly9fH9BmZY1ydlGKmvXdYGT26-cNQziVGqHPiArR_XYgR17xoiAPiae4np5N-fFnJor4lF4J6mKGddOHsubeWoSRB3BBb24qMm_zDFaHunVMFePIaSqh3pxub7danDsOnEkdTBJFMJLRwC5zu6jUg74pU7gZHWDmdxECXBv_jC4tUKJIDx6vmBdMneaI1zY73_fcemageLssP7LyCJZyCYcmkZbgtr3GkyieFOwIITgu-YiBVEavZvrVRFoffSCrzljTnipTMFXx4McNJQu0HQjugnRTkEz3YW_9kYoUZpoglllHWGoIKWIMMr1Xehze5JLxGeo5SLwO43O0NuitbZxooIjD5n2QirrwN8ceFGFr1gG-UwjunulgaaLN7hFJzDMo-1UdO8-ZR_Gp9o"
    }
   
    service.forgotPassword( payload).subscribe((res:any)=>{
      expect(res).toBeNull
    })
    const request = httptestoControl.expectOne(res=> res.method === 'POST' && res.url==='https://shop-api.ngminds.com/auth/forgot-password');

    expect(request.request.method).toEqual('POST');
    request.flush(null);
  })


  it('should change Password', () =>{
    let payload ={new_password: "Pass@1234", old_password: "Pass@1234"}
   
    service.changePassword( payload).subscribe((res:any)=>{
      expect(res).toBeNull
    })
    const request = httptestoControl.expectOne(res=> res.method === 'POST' && res.url==='https://shop-api.ngminds.com/users/auth/change-password');

    expect(request.request.method).toEqual('POST');
    request.flush(null);
  })


  it('should reset Password', () =>{
    let payload ={password: "Pass@1234"}
   
    service.resetPassword( payload,'id1234').subscribe((res:any)=>{
      expect(res).toBeNull
    })
    const request = httptestoControl.expectOne(res=> res.method === 'POST' && res.url==='https://shop-api.ngminds.com/auth/reset-password?token=id1234');

    expect(request.request.method).toEqual('POST');
    request.flush(null);
  })



  it('should Verify Email', () =>{
   
    service.VerifyEmail( ).subscribe((res:any)=>{
      expect(res).toBeNull
    })
    const request = httptestoControl.expectOne(res=> res.method === 'POST' && res.url==='https://shop-api.ngminds.com/auth/send-verification-email');

    expect(request.request.method).toBeNull
    request.flush(null);
  })

  it('should Verify Account', () =>{
   
    service.VerifyAccount( 'abcd').subscribe((res:any)=>{
      expect(res).toBeNull
    })
    const request = httptestoControl.expectOne(res=> res.method === 'POST' && res.url==='https://shop-api.ngminds.com/auth/verify-email?token=abcd');

    expect(request.request.method).toBeNull
    request.flush(null);
  })
  

  it('should google Sign In', () =>{
    let payload = {
      token:'token',
      captcha:'captcha'

    }

    let response={
      "user": {
          "_id": "6458d4b7305bd4f9b6b8236d",
          "name": "aniket fadale",
          "_org": {
              "_id": "6458d4b7305bd4f9b6b8236a",
              "name": "angular minds",
              "email": "aniketfadale1234@gmail.com"
          },
          "email": "aniketfadale1234@gmail.com",
          "role": "user",
          "isEmailVerified": true,
          "deleted": false,
          "createdAt": "2023-05-08T10:53:43.663Z",
          "updatedAt": "2023-05-08T12:21:59.176Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDU4ZDRiNzMwNWJkNGY5YjZiODIzNmQiLCJpYXQiOjE2ODY4MDcwNDIsImV4cCI6MTY4Njg5MzQ0MiwidHlwZSI6ImFjY2VzcyJ9.q27yBWpedNuTzrYiIGd7TSl9ze2O8kDTEN3sYHPvbaE",
      "expires": "2023-06-16T05:30:42.630Z"
  }
    service.googleSignIn( payload).subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method === 'POST' && res.url==='https://shop-api.ngminds.com/auth/login/google');

    expect(request.request.method).toEqual('POST')
    request.flush(response);
  })

  it('should add Product',()=>{
    let payload={

    }
    let response={

    }

    service.addProduct(payload).subscribe((res)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method === 'POST' && res.url === 'https://shop-api.ngminds.com/products')
    expect(request.request.method).toEqual('POST')
    request.flush(response)
 
  })

  it('should get All Products',()=>{
    let payload={

    }
    let response={

    }

    service.getAllProducts(payload).subscribe((res)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method === 'GET' && res.url === 'https://shop-api.ngminds.com/products')
    expect(request.request.method).toEqual('GET')
    request.flush(response)
 
  })

  it('should get Single Product',()=>{

    let response = {}
    service.getSingleProduct('abcd').subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='GET' && res.url === 'https://shop-api.ngminds.com/products/abcd')
    expect(request.request.method).toEqual('GET')
    request.flush(response)

  })

  it('should delete Product',()=>{

    let response = {}
    service.deleteProduct('abcd').subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='DELETE' && res.url === 'https://shop-api.ngminds.com/products/abcd')
    expect(request.request.method).toEqual('DELETE')
    request.flush(response)

  })

  it('should update Product',()=>{

    let response = {}
    service.updateProduct('abcd',{}).subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='PATCH' && res.url === 'https://shop-api.ngminds.com/products/abcd')
    expect(request.request.method).toEqual('PATCH')
    request.flush(response)

  })


  it('should update Product Image',()=>{

    let response = {}
    service.updateProductImage('abcd',{}).subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='PATCH' && res.url === 'https://shop-api.ngminds.com/products/images/abcd')
    expect(request.request.method).toEqual('PATCH')
    request.flush(response)

  })



  it('should delete Product Image',()=>{

    let response = {}
    service.deleteProductImage('abcd',{}).subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='PATCH' && res.url === 'https://shop-api.ngminds.com/products/images/abcd')
    expect(request.request.method).toEqual('PATCH')
    request.flush(response)

  })

  it('should get All Orders',()=>{

    let response = {}
    service.getAllOrders('abcd').subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='GET' && res.url === 'https://shop-api.ngminds.com/orders/')
    expect(request.request.method).toEqual('GET')
    request.flush(response)

  })

  it('should get Order Details',()=>{

    let response = {}
    service.getOrderDetails('abcd').subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='GET' && res.url === 'https://shop-api.ngminds.com/orders/abcd')
    expect(request.request.method).toEqual('GET')
    request.flush(response)

  })


  it('should Deliver Order',()=>{

    let response = {}
    service.toDeliverOrder('abcd').subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='PATCH' && res.url === 'https://shop-api.ngminds.com/orders/deliver/abcd')
    expect(request.request.method).toEqual('PATCH')
    request.flush(response)

  })

  it('should Dispatch Order',()=>{

    let response = {}
    service.toDispatchOrder('abcd').subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='PATCH' && res.url === 'https://shop-api.ngminds.com/orders/dispatch/abcd')
    expect(request.request.method).toEqual('PATCH')
    request.flush(response)

  })


  it('should Cancel Order',()=>{

    let response = {}
    service.toCancelOrder('abcd').subscribe((res:any)=>{
      expect(res).toEqual(response)
    })
    const request = httptestoControl.expectOne(res=> res.method ==='PATCH' && res.url === 'https://shop-api.ngminds.com/orders/cancel/abcd')
    expect(request.request.method).toEqual('PATCH')
    request.flush(response)

  })



  // it('should seller Guard',fakeAsync(()=>{

  //   let p :boolean = false

  //   Promise.resolve().then(()=>{
  //     p = true
  //   })
  //   expect(p).toBe(true)
  
  // }))



//   it('should seller Guard', fakeAsync(async () => {

//     spyOn(service, 'sellerGuard').and.returnValue(Promise.resolve(true));
//     spyOn(service, 'getUser').and.stub();
    
//      await service.sellerGuard()
//         .then(r => {
//             console.log(r);
//             expect(r).toBe(true);
//             flush(200);
//         })
//         .catch(e => fail(e));

//     expect(service.sellerGuard).toHaveBeenCalled();
    
// }));



// it('should seller Guard', async () => {
//   let expectedValue = false;
//   const resultPromise = service.sellerGuard();

//   const request = httptestoControl.expectOne(`https://shop-api.ngminds.com/auth/self`);
//   expect(request.request.method).toBe('GET');

//   resultPromise.then((res) => {
//     expect(res).toEqual(expectedValue);
//   });
// });



it('should resolve to true when getUser() returns a response', async () => {
  // Arrange
  spyOn(service, 'getUser').and.returnValue(of(new ArrayBuffer(0)));
  // Act
  const result = await service.sellerGuard();
  // Assert
  expect(result).toBe(true);
  // expect(service.getUser).toHaveBeenCalled();
});



it('should reject with false when getUser() encounters an error', async () => {
  // Arrange
  spyOn(service, 'getUser').and.returnValue(throwError('error'));
  // Act
  try {
    await service.sellerGuard();
    // If the promise resolves, it means the test failed
    fail('Expected the promise to reject.');
  } catch (error) {
    // Assert
    expect(error).toBe(false);
  }
});



it('should call getUser() during guard execution', async () => {
  // Arrange
  spyOn(service, 'getUser').and.returnValue(of(new ArrayBuffer(0)));
  // Act
  const result = await service.sellerGuard();
  // Assert
  expect(service.getUser).toHaveBeenCalled();
});




});
