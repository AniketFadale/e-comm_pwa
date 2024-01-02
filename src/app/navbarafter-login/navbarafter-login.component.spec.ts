import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarafterLoginComponent } from './navbarafter-login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { StoreAtURLService } from '../seller/localStorageService/store-at-url.service';
import { of, throwError } from 'rxjs';
import { GetdataService } from '../seller/localStorageService/getdata.service';

describe('NavbarafterLoginComponent', () => {
  let component: NavbarafterLoginComponent;
  let fixture: ComponentFixture<NavbarafterLoginComponent>;
  let router : Router
  let serve:StoreAtURLService
  let getdata :GetdataService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarafterLoginComponent ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarafterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(()=>{
    router =TestBed.inject(Router)
    serve=TestBed.inject(StoreAtURLService)
    getdata=TestBed.inject(GetdataService)
  })
  it('should create', () => {
    spyOn(serve,'getUser').and.returnValue(of({name:'aniket'}))
    getdata.myNav.next(false)
    expect(component).toBeTruthy();
  });
  it('should create throw error', () => {
    spyOn(serve,'getUser').and.returnValue(throwError({error:{message:'error'}}))
    getdata.myNav.next(false)
    expect(component).toBeTruthy();
  });
  it('shouold logout',()=>{
    spyOn(router,'navigate')
    component.logout()
    expect(router.navigate).toHaveBeenCalled()
  }) 
  it('shouold createuser',()=>{
    spyOn(router,'navigate')
    component.createuser()
    expect(router.navigate).toHaveBeenCalled()
    component.logout2()
  })
});
