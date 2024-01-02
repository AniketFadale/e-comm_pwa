import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ConfirmOrderComponent } from './confirm-order.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ShopServiceService } from '../../services/shop-service.service';

describe('ConfirmOrderComponent', () => {
  let component: ConfirmOrderComponent;
  let fixture: ComponentFixture<ConfirmOrderComponent>;
  let shopServe:ShopServiceService
  let router :Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOrderComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {queryParams: of({id:'sdfsd'})}
        },
      ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(()=>{
    shopServe=TestBed.inject(ShopServiceService)
    router=TestBed.inject(Router)
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should PaymentByCard',()=>{
    spyOn(shopServe,'ConfirmOrder').and.returnValue(of({}))
    spyOn(router,'navigate')
    component.PaymentByCard({value:{mm:'',yyyy:'',nameOnCard:'',cardNumber:'',cvv:''}})
  })
  it('should PaymentByCard throw error',()=>{
    spyOn(shopServe,'ConfirmOrder').and.returnValue(throwError({error:{message:'error'}}))
    spyOn(router,'navigate')
    component.PaymentByCard({value:{mm:'',yyyy:'',nameOnCard:'',cardNumber:'',cvv:''}})
  })
  it('should ConfigInput',fakeAsync(()=>{
    component.numb=123456789456123456
    component.ConfigInput()
  }));
  it('should ConfigInput else block',()=>{
    component.ConfigInput()
  })

  it('should configCvv',()=>{
    component.cvvOfCard = 1234
    component.configCvv()
  })
  it('should configCvv else block',()=>{
    component.cvvOfCard = 123
    component.configCvv()
  })

});
