import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileComponent } from './my-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;
  let serve:StoreAtURLService
  let router:Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileComponent ],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(StoreAtURLService)
    router=TestBed.inject(Router)
  })
  it('should create', () => {
    spyOn(serve,'getUser').and.returnValue(of({}))
    TestBed.createComponent(MyProfileComponent);
    expect(component).toBeTruthy();
    expect(serve.getUser).toHaveBeenCalled()
  });

  it('should logout',()=>{
    spyOn(router,'navigate')
    component.logout()
    expect(router.navigate).toHaveBeenCalled()
  })
  it('should editProfile',()=>{
    let x:any={}
    component.res={_org:{}}
    spyOn(router,'navigate')
    component.editProfile()
    expect(router.navigate).toHaveBeenCalled()
    component.updateProfile(x)
  })

  it('should verifyEmail',()=>{
    spyOn(serve,'VerifyEmail').and.returnValue(of(new ArrayBuffer(0)))
    component.verifyEmail()
  })
  it('should verifyEmail',()=>{
    spyOn(serve,'VerifyEmail').and.returnValue(throwError({error:{message:'error'}}))
    component.verifyEmail()
  })

});
