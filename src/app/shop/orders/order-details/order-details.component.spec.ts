import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponent } from './order-details.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';
import { ShopServiceService } from '../../services/shop-service.service';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let serve :ShopServiceService

  let router :Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent ],
      providers:[

        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({id: '123'})
          }
        },
      ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        SharedPipeModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(()=>{
    serve=TestBed.inject(ShopServiceService)
    router=TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it ('should getproduct',()=>{
    spyOn(serve,'getOrderDetails').and.returnValue(of({}))
    component.getproduct()
    expect(serve.getOrderDetails).toHaveBeenCalled()
  })

  it('should confirm',()=>{
    component.res={
      _id : '1234'
    }
    spyOn(router,'navigateByUrl')
    component.confirm()
    expect(router.navigateByUrl).toHaveBeenCalled()
  })

  it('should cancelOrder',()=>{
    component.res={
      _id : '1234'
    }
    spyOn(serve,'cancelOrder').and.returnValue(of({}))
    component.cancelOrder()
    expect(serve.cancelOrder).toHaveBeenCalled()
  })

  it('should cancelOrder throw error',()=>{
    component.res={
      _id : '1234'
    }
    spyOn(serve,'cancelOrder').and.returnValue(throwError({error:{message:'123'}}))
    component.cancelOrder()
    expect(serve.cancelOrder).toHaveBeenCalled()
  })
});
