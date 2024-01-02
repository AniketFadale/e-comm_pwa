import { ComponentFixture, TestBed, async, fakeAsync, flush, tick } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Observable, of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GetCutomerLoginService } from 'src/app/shop/services/get-cutomer-login.service';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { By } from '@angular/platform-browser';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let getCutomerLoginService : GetCutomerLoginService
  let router :Router
  let serve:StoreAtURLService
  const mockActivatedRoute = {
    queryParams: of({id:'1234'})
  };
  let mockSomeService = {
    getData: () => {}
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers:[{
        provide: ActivatedRoute,
        useValue: mockActivatedRoute
      }, { provide: GetCutomerLoginService, useValue: mockSomeService },
      ToastrService,
      GetCutomerLoginService
    ],
    imports:[
      HttpClientTestingModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      SharedPipeModule
    ]
    })
    .compileComponents();

  });
  
  beforeEach(()=>{
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getCutomerLoginService=TestBed.inject(GetCutomerLoginService)
    router = TestBed.inject(Router)
    serve =TestBed.inject(StoreAtURLService)
  })

  it('should create',() => {
   
    expect(component).toBeTruthy();
    // TestBed.createComponent(ProductComponent);
    // spyOn(mockSomeService, 'getData').and.returnValue({ subscribe:of () => {} })
  });
  
  it('should call ngoninit',fakeAsync(() =>{
    let obj={
      images:[
       {url:'sdfsd'}
      ]
    }
    spyOn(serve,'getSingleProduct').and.returnValue(of(obj))
    component.product=obj;
    component.getProduct()
    expect(serve.getSingleProduct).toHaveBeenCalled()
    flush();
  })) 

    
  it('should call get single product error',() =>{
    let obj={
      images:[
       {url:'sdfsd'}
      ]
    };
    spyOn(serve,'getSingleProduct').and.returnValue(throwError({error:{message:'anything you cant do ??'}}))
  
    component.getProduct()
  
    expect(serve.getSingleProduct).toHaveBeenCalled()
  });


  it('should addd images',()=>{
    component.uploadedImg=[{}];
    spyOn(serve,'updateProductImage').and.returnValue(of({}))
    component.AddMultipleIMages();
    
   
    expect(serve.updateProductImage).toHaveBeenCalled()
  })
  it('should addd images throw error',()=>{
    spyOn(serve,'updateProductImage').and.returnValue(throwError({error:{message:'img update error'}}))
    component.AddMultipleIMages();
    expect(serve.updateProductImage).toHaveBeenCalled()
  })
  it('should store Image and change img',()=>{
    let eve={target:{files:[{}]}}
    component.storeImg(eve)
    component.changeImg(eve)
  })
  it('should call delete img',()=>{
    spyOn(serve,'deleteProductImage').and.returnValue(of({}))
    component.Delete()
  })
  it('should delete address when confirmed', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'deleteProductImage').and.returnValues(of(response));
    component.Delete();
    component.selectedImage = [{images : 'dhsdh'}]
    tick(10)
    let fix = new FormData
    expect(serve.deleteProductImage).toHaveBeenCalledWith('1234',fix);
    flush()
  }));
  it('should delete address when error', fakeAsync(() => {
    const response = { success: false };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'deleteProductImage').and.returnValues(throwError({error:{message : 'error'}}));
    component.Delete();
    component.selectedImage = [{images : 'dhsdh'}]
    tick(10)
    let fix = new FormData
    expect(serve.deleteProductImage).toHaveBeenCalled();
    flush()
  }));
  it('should delete address when not confirmed', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'deleteProductImage').and.returnValues(of(response));
    component.Delete();
    component.selectedImage = []
   
  }));
  it('should call select',()=>{
    component.selectedImage = []
    component.product = {
      images:[{public_id : '1234'}]
    }
    component.select(0 , {})
    
  })
  it('should call select else',()=>{
    component.selectedImage = ['1234']
    component.product = {
      images:[{public_id : '1234'}]
    }
    component.select(0 , {})
    

  })
  it('should call select else with push non dublicate value',()=>{
    component.selectedImage = ['123aa']
    component.product = {
      images:[{public_id : '1234'}]
    }
    component.select(0 , {})
    

  })
  it('it should select border',()=>{
    component.selectedImage = ['1234']
    component.product={images:[{public_id : '1234'}]}
    component.selectborder(0)
  })
  it('it should image zoom',()=>{
    let ex = {
      clientWidth:10,
      clientHeight:10
        }
        let event = {
          offsetX:10,
          offsetY:10,
          naturalHeight:10
        }
        component.fig ={
          style:{
            transform :'10',
            backgroundPositionX:'10 px',
            backgroundPositionY:'10 px'
              }}
              component.event = event
    component.imgzoom(ex ,event )
    component.f1(event)
    component.imgzoomout(ex)
  })
});



// new



// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
// import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
// import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
// import { ToastrService } from 'ngx-toastr';
// import { of } from 'rxjs';
// import { ProductComponent } from './product.component';
// import { GetCutomerLoginService } from 'src/app/shop/services/get-cutomer-login.service';
// import { HttpClientModule } from '@angular/common/http';

// describe('ProductComponent', () => {
//   let component: ProductComponent;
//   let fixture: ComponentFixture<ProductComponent>;
//   let mockGetCurrency: jasmine.SpyObj<GetCutomerLoginService>;
//   let mockRoute: jasmine.SpyObj<ActivatedRoute>;
//   let mockServe: jasmine.SpyObj<StoreAtURLService>;
//   let mockGetData: jasmine.SpyObj<GetdataService>;
//   let mockToast: jasmine.SpyObj<ToastrService>;

//   beforeEach(async () => {
//     const getCurrencySpy = jasmine.createSpyObj('GetCutomerLoginService', ['getCurrency']);
//     const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParamMap']);
//     const serveSpy = jasmine.createSpyObj('StoreAtURLService', [
//       'getSingleProduct',
//       'updateProductImage',
//       'deleteProductImage',
//     ]);
//     const getDataSpy = jasmine.createSpyObj('GetdataService', ['setNav']);
//     const toastSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

//     await TestBed.configureTestingModule({
//       declarations: [ProductComponent],
//       providers: [
//         { provide: GetCutomerLoginService, useValue: getCurrencySpy },
//         { provide: ActivatedRoute, useValue: routeSpy },
//         { provide: StoreAtURLService, useValue: serveSpy },
//         { provide: GetdataService, useValue: getDataSpy },
//         { provide: ToastrService, useValue: toastSpy },
//       ],
//       imports:[
//         HttpClientModule
//       ]
//     }).compileComponents();

//     mockGetCurrency = TestBed.inject(GetCutomerLoginService) as jasmine.SpyObj<GetCutomerLoginService>;
//     mockRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
//     mockServe = TestBed.inject(StoreAtURLService) as jasmine.SpyObj<StoreAtURLService>;
//     mockGetData = TestBed.inject(GetdataService) as jasmine.SpyObj<GetdataService>;
//     mockToast = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

//     fixture = TestBed.createComponent(ProductComponent);
//     component = fixture.componentInstance;
//   });

//   it('should set currency on component initialization', fakeAsync(() => {
//     const currency = 'USD';
//     // mockGetCurrency.getCurrency.and.returnValue(currency);

//     fixture.detectChanges();
//     tick();

//     expect(component.currency).toEqual(currency);
//   }));

//   // Rest of the test cases remain the same
// });
