import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { MyCaptchaService } from '../../localStorageService/my-captcha.service';
import { FormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../auth-routing.module';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let  toastrService : ToastrService
  let serve : StoreAtURLService
  let myCaptchaService:MyCaptchaService
  let router :Router
  let location:Location
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers:[
        ToastrService,
        Router,
        ReCaptchaV3Service,
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: MyCaptchaService,
        },
        
      ],
      imports:[
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        RouterModule,
        FormsModule
      ]
    })
    .compileComponents();

  });
  
  
  beforeEach(()=>{
    
    fixture = TestBed.createComponent(ForgotPasswordComponent);

    toastrService = TestBed.inject(ToastrService);
    serve=TestBed.inject(StoreAtURLService);
    myCaptchaService=TestBed.inject(MyCaptchaService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  
    router = TestBed.inject(Router) 
    router.initialNavigation();
    location=TestBed.inject(Location)

  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call forgot pass',fakeAsync(
    ()=>{
      let payload={
        email:undefined,
        captcha :undefined,
      };
     let url = '/auth/login';
     spyOn(serve,'forgotPassword').and.returnValues(of(new ArrayBuffer(0)))
  
     spyOn(router,'navigate')
     spyOn(component,'executeCaptcha');
    
    let user = {
      value:{
        email:undefined
      }
    }
      component.forgotPass(user)
      expect(serve.forgotPassword).toHaveBeenCalledWith(payload);
      tick(100);
      // fixture.whenStable().then(()=>{
  
      //   expect(location.path()).toEqual([url]);
      // })
     //expect(router.navigate).toHaveBeenCalledWith([url])
    }
  ))

  it('should throw error on forgot pass', () => {
   
    let obj ={  email: undefined, captcha: undefined }

    spyOn(serve, 'forgotPassword').and.returnValue(
      throwError({ error: { message: 'email no verified' } })
    );
   
    component.forgotPass({});
    expect(serve.forgotPassword).toHaveBeenCalledWith(obj);
    
  });
});
