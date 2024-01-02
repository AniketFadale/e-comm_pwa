import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { MyCaptchaService } from '../../localStorageService/my-captcha.service';
import environment from 'src/app/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { of, throwError } from 'rxjs';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let myCaptchaService:MyCaptchaService
  let router :Router
  let serve:StoreAtURLService
  let toast :ToastrService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      providers:[
        ToastrService
        ,Router
        ,ReCaptchaV3Service,
        StoreAtURLService,
        MyCaptchaService,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
    ],
      imports:[
        ToastrModule.forRoot(),
        RouterTestingModule,
        RouterModule,
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule
      
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router=TestBed.inject(Router)
    myCaptchaService=TestBed.inject(MyCaptchaService)
    serve= TestBed.inject(StoreAtURLService)
    toast=TestBed.inject(ToastrService)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call reset password',()=>{

    let dummyFormData = {
      value: {
        old_password: '12345',
        confirm_password: '1234',
        new_password: '1234',
      },
    }
    spyOn(serve,'resetPassword').and.returnValue(of({}))
    spyOn(router,'navigate')
    component.resetPass(dummyFormData)
    if (
      dummyFormData.value.new_password == dummyFormData.value.confirm_password
    ) {
      let data = {
        old_password: dummyFormData.value.old_password,
        new_password: dummyFormData.value.new_password,
      };
    }
  });



  it('should throw error on forgot pass', () => {
   
    // let obj ={  email: undefined, captcha: undefined }
      
    let dummyFormData={
      value:{
        old_password: '1234',
        new_password :'12345',
        confirm_password :'12345'
      }
    }

    spyOn(serve, 'resetPassword').and.returnValue(
      throwError({ error: { message: 'email no verified' } })
    );
   component.para='1234'
   component.payload.password='12345'
    component.resetPass(dummyFormData);
    if (
          dummyFormData.value.new_password == dummyFormData.value.confirm_password
        ) {
          let param = '1234'
          let obj={
            password : undefined
          }
          expect(serve.resetPassword).toHaveBeenCalledWith(obj,param);
        }
    
  });

  it('should call else block of resetPass',()=>{
    let dummyFormData = {
      value: {
        old_password: '12345',
        confirm_password: '12234',
        password: '123455',
      },
    };
    component.resetPass(dummyFormData);
    
    
  })
  
});
