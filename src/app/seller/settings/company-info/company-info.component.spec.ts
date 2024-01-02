import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CompanyInfoComponent } from './company-info.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('CompanyInfoComponent', () => {
  let component: CompanyInfoComponent;
  let fixture: ComponentFixture<CompanyInfoComponent>;
  let serve : StoreAtURLService
  let router :Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInfoComponent ],
      providers:[
        ToastrService
      ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
  });
  beforeEach(()=>{
    
        fixture = TestBed.createComponent(CompanyInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        serve = TestBed.inject(StoreAtURLService)
        router = TestBed.inject ( Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
    component.editCompany()
  });
  it('should update Company',()=>{
  //   component.user={
  //     email: 'string',
  //     name: 'string'
  // }
    spyOn(serve,'CompanyInfo').and.returnValue(of(new ArrayBuffer(0)))
    component.updateCompany()
    expect(serve.CompanyInfo).toHaveBeenCalled()

  })
  it('should update Company throw error',()=>{
    spyOn(serve,'CompanyInfo').and.returnValue(throwError({error:{message:'error'}}))
    component.updateCompany()
    expect(serve.CompanyInfo).toHaveBeenCalled()
  })
  it('should update Company get user service',fakeAsync(
    ()=>{
      spyOn(serve,'getUser').and.returnValue(of({_org : {email:'aniket@gmail.com',name : 'anike'}}))
      spyOn(router,'navigate')
      component.updateCompany()
      component.res = {_org : {email:'aniket@gmail.com',name : 'anike'}}
      expect(serve.getUser).toHaveBeenCalled();
      component.CreateUser()
      expect(router.navigate).toHaveBeenCalled()
    }
  ))
});
