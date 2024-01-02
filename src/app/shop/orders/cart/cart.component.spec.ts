import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { ReducerManager, Store, StoreModule } from '@ngrx/store';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';
import { GetCutomerLoginService } from '../../services/get-cutomer-login.service';
import { of } from 'rxjs';
import { counterReducer } from '../../counter.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { counterState } from '../../counter.state';
import { Router } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let getCurrency:GetCutomerLoginService;
  let store: MockStore<counterState>;
  let router :Router
  const initialState: counterState = {
    users: [{}],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers:[
        Store<any>,
        provideMockStore({ initialState }), // Provide initial state
        { provide: ReducerManager, useValue: {} },
      ],
      imports:[
        StoreModule.forRoot({}),
        SharedPipeModule,

      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<counterState>;
    router =TestBed.inject(Router)
    fixture.detectChanges();
  });

  beforeEach(()=>[
    getCurrency=TestBed.inject(GetCutomerLoginService)
  ])
  it('should create', fakeAsync(() => {
  
    getCurrency.currency.next('c')
    expect(component).toBeTruthy();
  }));

  it('should removeElement else block',()=>{
    component.CartProducts=[{quantity:1,price:100,},{quantity:1,price:100,}]
    component.removeElement(0)
  })

  it('should removeElement if block',()=>{
    component.CartProducts=[{quantity:1,price:100,}]
    component.removeElement(0)
  }) 
  
  it('should increment',()=>{
    component.CartProducts=[{quantity:1,price:100,}]
    component.increment(0)
  })
  it('should decrement',()=>{
    component.CartProducts=[{quantity:2,price:100,}]
    component.decrement(0)
  })

it('should  calculateTotal',()=>{
    component.CartProducts=[{quantity:2,price:100,deal:{price:1000}}]
    component. calculateTotal()
  })

it('should  PlaceOrder',()=>{
  spyOn(router,'navigate')
  localStorage.setItem('customerLogin','[]')
    component.CartProducts=[{quantity:2,price:100,deal:{price:1000}}]
    component. PlaceOrder()
  })

it('should  PlaceOrder else block',()=>{
  spyOn(router,'navigate')
  // localStorage.setItem('customerLogin','')
    component.CartProducts=[{quantity:2,price:100,deal:{price:1000}}]
    component. PlaceOrder()
  })

it('should  getCartElementFromLocal',()=>{
    component.CartProducts=[{quantity:2,price:100,deal:{price:1000}}]
    localStorage.setItem('cart',JSON.stringify([{quantity:2,price:100,deal:{price:1000}}]))
    component. getCartElementFromLocal()
  })
  
  
});
