import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { counterReducer } from '../../counter.reducer';
import { ToastrModule } from 'ngx-toastr';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';
import { UrlService } from '../../services/url.service';
import { of, throwError } from 'rxjs';
import { ShopServiceService } from '../../services/shop-service.service';
import { Router } from '@angular/router';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let serve : ShopServiceService
  let ser : UrlService;
  let router :Router
  // let store : any
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderComponent ],
      providers:[Store],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        ToastrModule.forRoot(),
        SharedPipeModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    ser = TestBed.inject(UrlService);
    fixture.detectChanges();
    // store=TestBed.inject(Store)
    router = TestBed.inject(Router)
    serve= TestBed.inject(ShopServiceService)
  });

  it('should create',fakeAsync( () => {
  let address=[{
      street: 'aasad',
      addressLine2: 'adsas',
      city: 'sadasd',
      state: 'asdaa',
      pin: 'asdsda',
    }]
    spyOn(component['store'], 'select').and.returnValue(of({users:[{}]}));
    spyOn(ser,'GetSavedAddress').and.returnValue(of(address))
    TestBed.createComponent(CreateOrderComponent);
    expect(ser.GetSavedAddress).toHaveBeenCalled()
    tick()
    expect(component).toBeTruthy();
  }));

  it('should MakePayment ',()=>{
    spyOn(router , 'navigateByUrl')
    spyOn(serve,'createOrder').and .returnValue(of({order:{_id:'1234'}}))
    component.cartElement = [{
      name :'aniket',
      _id:'1234',
      quantity:1,
      deal : {
        price : 1000,

      }
    }]

    component.address= [
      {
        street: 'balewadi',
        addressLine2: 'baner',
        city: 'pune',
        state: 'maharastra',
        pin: '411114',
      },
    ]
    component.addIndex=0
    component.payload = {
      items: [{}],
      deliveryFee: 40,
      total: 0,
      address: {
        street: 'balewadi',
        addressLine2: 'baner',
        city: 'pune',
        state: 'maharastra',
        pin: '411114',
      },
    };
    component.MakePayment()
    expect(serve.createOrder).toHaveBeenCalled()
  })


  it('should MakePayment throw error',()=>{
    spyOn(router , 'navigateByUrl')
    spyOn(serve,'createOrder').and .returnValue(throwError({error:{message:'error'}}))
    component.cartElement = [{
      name :'aniket',
      _id:'1234',
      quantity:1,
      deal : {
        price : 1000,

      }
    }]

    component.address= [
      {
        street: 'balewadi',
        addressLine2: 'baner',
        city: 'pune',
        state: 'maharastra',
        pin: '411114',
      },
    ]
    component.addIndex=0
    component.payload = {
      items: [{}],
      deliveryFee: 40,
      total: 0,
      address: {
        street: 'balewadi',
        addressLine2: 'baner',
        city: 'pune',
        state: 'maharastra',
        pin: '411114',
      },
    };
    component.MakePayment()
    expect(serve.createOrder).toHaveBeenCalled()
  })


  it('should MakePayment else block',()=>{
    component.cartElement = [{
      name :'aniket',
      _id:'1234',
      quantity:1,
     
    }]
    spyOn(serve,'createOrder').and .returnValue(of({order:{_id:'1234'}}))
    spyOn(router , 'navigateByUrl')
    component.address= [
      {
        street: 'balewadi',
        addressLine2: 'baner',
        city: 'pune',
        state: 'maharastra',
        pin: '411114',
      },
    ]
    component.addIndex=0
    component.payload = {
      items: [{}],
      deliveryFee: 40,
      total: 0,
      address: {
        street: 'balewadi',
        addressLine2: 'baner',
        city: 'pune',
        state: 'maharastra',
        pin: '411114',
      },
    };
  
    component.payload = {
      items: [{}],
      deliveryFee: 40,
      total: 0,
      address: {
        street: 'balewadi',
        addressLine2: 'baner',
        city: 'pune',
        state: 'maharastra',
        pin: '411114',
      },
    };
    component.MakePayment()
    expect(serve.createOrder).toHaveBeenCalled()
  })


  it('should call f1 ',()=>{
    component.f1(0)
  })
});
