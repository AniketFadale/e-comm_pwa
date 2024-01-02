import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let serve : StoreAtURLService
  let router:Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports:[
        HttpClientTestingModule,
        HttpClientModule,
        NgxPaginationModule,
        FormsModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(StoreAtURLService)
    router = TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call data', () => {
    let res={
      totalResults:10
    }
    component.params={
      sortBy: 'default' ,
    limit: 10,
    page: 1,}
    spyOn(serve,'getAllProducts').and.returnValue(of(res))
    component.callData()
    expect(serve.getAllProducts).toHaveBeenCalledWith({ sortBy: 'default', limit: 10, page: 1 })
  });
  it('should call data throw error and callData with limit', () => {
    let res={
      totalResults:10
    }
    component.params={
      sortBy: 'default' ,
    limit: 10,
    page: 1,}
    spyOn(serve,'getAllProducts').and.returnValue(throwError({error:{message:'error'}}))
    component.callData()
    expect(serve.getAllProducts).toHaveBeenCalledWith({ sortBy: 'default', limit: 10, page: 1 })
    component.callDataWithLimit()
  });
  it('should call upadte Product',()=>{
    spyOn(serve,'updateProduct').and.returnValue(of(new ArrayBuffer(0)))
    component.upadteProduct();
    expect(serve.updateProduct).toHaveBeenCalled()
  })

  it('should call upadte Product throw error',()=>{
    spyOn(serve,'updateProduct').and.returnValue(throwError({error:{message:'error'}}))
    component.upadteProduct();
    expect(serve.updateProduct).toHaveBeenCalled()
  })

  it('should delete Product',fakeAsync(()=>{
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'deleteProduct').and.returnValue(of(response)) 
    component.deleteProduct(2)
    tick(10)
    expect(serve.deleteProduct).toHaveBeenCalled();
  }))

  it('should delete Product throw error',fakeAsync(()=>{
    const response = { success: true };
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'deleteProduct').and.returnValue(throwError({error:{message : 'throw error'}}));
    component.deleteProduct(2);
    tick(10);
    expect(serve.deleteProduct).toHaveBeenCalled();
    flush()
  }));

  it('should on TableData Change and call save index',()=>{
    component.onTableDataChange(1)
    component.saveIndex(1)
  })
  it('should store uploaded images',()=>{
   component.storeUpdatedImg({
    target:{
      files:[{}]
    }
   })
  })
  it('should sort by name',()=>{
    component.sortByName()
   })
   it('should sort by name else block',()=>{
    spyOn(serve,'getAllProducts').and.returnValue(of({}))
    component.SearchedName='ghfdha'
    component.sortByName()
    expect(serve.getAllProducts).toHaveBeenCalled()
   })
   it('should sort by name else block',()=>{
    spyOn(serve,'getAllProducts').and.returnValue(throwError({error:{message:'error'}}))
    component.SearchedName='ghfdha'
    component.sortByName()
    expect(serve.getAllProducts).toHaveBeenCalled()
   })
   it('should show Product',()=>{
    spyOn(router,'navigate')
    component.products={results:[{_id:'abcd'}]}
    component.showProduct(0)
   })

});
