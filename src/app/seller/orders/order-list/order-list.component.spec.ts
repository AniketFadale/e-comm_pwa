import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { OrderListComponent } from './order-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
let serve : StoreAtURLService
let router :Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListComponent ],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        NgxPaginationModule,
        FormsModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve= TestBed.inject(StoreAtURLService)
    router = TestBed.inject(Router)
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should callData', () => {
    let res ={results:[]}
    spyOn(serve,'getAllOrders').and.returnValue(of({}))
    component.callData()

  });

  it('should getSortedUrl', () => {
    let res ={results:[]}
    spyOn(serve,'getAllOrders').and.returnValue(of({}))
    component.getSortedUrl(['fhakjdf','fjdagj','jhgjhf'])

  });

  it('should showDetails', fakeAsync(() => {
    spyOn(router,'navigateByUrl')
    component.orderData=[{_id:'jhGAJ'}]
    component.showDetails(0)
    expect(router.navigateByUrl).toHaveBeenCalled()
    component.NumOfOrdersTOShow()
    component.onTableDataChange({})
    flush()
  }));

});
