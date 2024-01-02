import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { OrderdetailsComponent } from './orderdetails.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('OrderdetailsComponent', () => {
  let component: OrderdetailsComponent;
  let fixture: ComponentFixture<OrderdetailsComponent>;
  const mockActivatedRoute = {
    queryParams: of({id:'1234'})
  };
  let serve:StoreAtURLService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderdetailsComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        SharedPipeModule
      ]
    })
    .compileComponents();

  });
  
  beforeEach(()=>{
    fixture = TestBed.createComponent(OrderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(StoreAtURLService)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should callData', () => {

    spyOn(serve,'getOrderDetails').and.returnValue(of({}))
    component.callData()
  });

  it('should deliver', () => {
    component.ProductData={_id:'jhsdag'}
    spyOn(serve,'toDeliverOrder').and.returnValue(of({}))
    component.deliver()
    expect(serve.toDeliverOrder).toHaveBeenCalled()
  });

  it('should deliver throw error', () => {
    component.ProductData={_id:'jhsdag'}
    spyOn(serve,'toDeliverOrder').and.returnValue(throwError({error:{message:'error'}}))
    component.deliver()
    expect(serve.toDeliverOrder).toHaveBeenCalled()
  });

  it('should dispatch', () => {
    component.ProductData={_id:'jhsdag'}
    spyOn(serve,'toDispatchOrder').and.returnValue(of({}))
    component.dispatch()
    expect(serve.toDispatchOrder).toHaveBeenCalled()
  });

  it('should dispatch throw error', () => {
    component.ProductData={_id:'jhsdag'}
    spyOn(serve,'toDispatchOrder').and.returnValue(throwError({error:{message:'error'}}))
    component.dispatch()
    expect(serve.toDispatchOrder).toHaveBeenCalled()
  });

  it('should cancel order',fakeAsync(()=>{
    component.ProductData={_id:'jhsdag'}
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'toCancelOrder').and.returnValues(of(response));
    component.cancel();
    tick(10)
    expect(serve.toCancelOrder).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalled();
    flush()
  }));

  it('should cancel order',fakeAsync(()=>{
    component.ProductData={_id:'jhsdag'}
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'toCancelOrder').and.returnValues(throwError({error:{message:'error'}}));
    component.cancel();
    tick(10)
    expect(serve.toCancelOrder).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalled();
    flush()
  }));


});
