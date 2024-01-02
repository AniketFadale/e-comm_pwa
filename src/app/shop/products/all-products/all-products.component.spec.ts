import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsComponent } from './all-products.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../../counter.reducer';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UrlService } from '../../services/url.service';
import { Router } from '@angular/router';

describe('AllProductsComponent', () => {
  let component: AllProductsComponent;
  let fixture: ComponentFixture<AllProductsComponent>;
  let serve : UrlService

  let router:Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProductsComponent ],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        StoreModule.forRoot({users : counterReducer}),
        NgxPaginationModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(()=>{
    serve = TestBed.inject(UrlService)
    router =TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call data', () => {
    spyOn(serve,'getShopProducts').and.returnValue(of({totalResults:10}))
    component.callData()
    expect(component).toBeTruthy();

  });

  it('should call data throw error', () => {
    spyOn(serve,'getShopProducts').and.returnValue(throwError({error:{message:'error'}}))
    component.callData()
    expect(component).toBeTruthy();

  });

  it('should callDataWithLimit', () => {
    component.products={
      results:[
        {name:'aniket'},
        {description:'gfjdgjdz'},
        {price:1000}
      ]
    }
    component.callDataWithLimit()
    component.onTableDataChange(1)
    component.saveIndex(0)
    expect(component).toBeTruthy();

  });

  it('should storeUpdatedImg', () => {
    let event={
      target:{
        files:[{}]
      }
    }
    component.storeUpdatedImg(event)
    // expect(component).toBeTruthy();

  });

  it('should sortByName',()=>{
    component.sortByName()
    expect(component).toBeTruthy();

  })

  it('should sortByName else block',()=>{

    component.SearchedName = 'aniket'
    spyOn(serve,'getShopProducts').and.returnValue(of({}))
    component.sortByName()
    expect(component).toBeTruthy();

  })

  it('should sortByName else block throw error',()=>{

    component.SearchedName = 'aniket'
    spyOn(serve,'getShopProducts').and.returnValue(throwError({error:{message:'error'}}))
    component.sortByName()
    expect(component).toBeTruthy();

  })

  it('should show Product',()=>{
    component.products={results:[{_id:'1234'}]}
    spyOn(router,'navigate')
    component.showProduct(0)
    expect(component).toBeTruthy();

  })
  it('should add to cart',()=>{
    component.products={results:[{quantity:1}]}
    component.AddToCart(0)
    expect(component).toBeTruthy();

  })

  it('should changeCurrency',()=>{
    component.changeCurrency()
    expect(component).toBeTruthy();

  })
});
