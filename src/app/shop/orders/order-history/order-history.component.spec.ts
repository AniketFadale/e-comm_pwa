import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryComponent } from './order-history.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ShopServiceService } from '../../services/shop-service.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let serve : ShopServiceService
  let router : Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistoryComponent ],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        SharedPipeModule,
        NgxPaginationModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(()=>{
    serve = TestBed.inject(ShopServiceService)
    router = TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call data ',()=>{
    spyOn(serve,'getAllOrders').and.returnValue(of({}))
    component.callData()
    expect(serve.getAllOrders).toHaveBeenCalled()
  })

  it('should showDetails',()=>{
    spyOn(router,'navigateByUrl')
    component.orderData =[{
      _id:'1234'
    }]
    component.showDetails(0)
    expect(router.navigateByUrl).toHaveBeenCalled()
    component.NumOfOrdersTOShow()
  })

  it('should onTableDataChange',()=>{
    component.onTableDataChange({})
  })
});
