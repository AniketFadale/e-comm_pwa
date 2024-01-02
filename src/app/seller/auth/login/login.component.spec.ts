import { ComponentFixture, TestBed, async, fakeAsync, flush, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MyCaptchaService } from '../../localStorageService/my-captcha.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialUser } from 'angularx-social-login';
import {  ToastrModule, ToastrService } from 'ngx-toastr';
import { GetdataService } from '../../localStorageService/getdata.service';
import { LocalStorageService } from '../../localStorageService/local-storage.service';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';
import environment from 'src/app/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
 
  let serve:StoreAtURLService;
  let httpClient:HttpClient;
  let httpMock:HttpTestingController;
  let captchaService:MyCaptchaService;
  let localStorageService:LocalStorageService;
  let socialAuthService:SocialAuthService;
  // let toastrService : ToastrService;
  let toastrService: jasmine.SpyObj<ToastrService>
  let router:Router;
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ 
        MyCaptchaService,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
        GetdataService,ReCaptchaV3Service,
        { provide: ToastrService, useValue: toastrService },

        {
          provide: 'SocialAuthServiceConfig',
          
          useValue: {
            autoLogin: false,
            providers: [
              
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  environment.clientId
                )
              },
            ],
            onError: (err: any) => {
              console.error(err);
            }
          } as SocialAuthServiceConfig,
        },
        SocialAuthService,
     ],imports:[
      ToastrModule.forRoot(),
      RouterTestingModule,
      RecaptchaV3Module,
      HttpClientModule,
      FormsModule,
      HttpClientTestingModule
     ]
      
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(StoreAtURLService);
    httpClient=TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
    captchaService = TestBed.inject(MyCaptchaService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router) 
    // toastrService = TestBed.inject(ToastrService)
  })

  it('should create', () => {
    spyOn(router,'navigate')
    TestBed.createComponent(LoginComponent);
    expect(component).toBeTruthy();
    // expect(router.navigate).toHaveBeenCalled()
  });


  it('should settime',fakeAsync( () => {
    
    spyOn(router,'navigate')
    component.settime()
    tick(100)

    expect(router.navigate).toHaveBeenCalled()
    flush()
    
  }));
  
  it('should loginUser',fakeAsync(()=>{
    let data:any={
     value: 
     {email : 'jdjh',
      password : 'sdhgj',
      }
    }
    tick(1000)
    let x:any={}
    component.captcha='abcd'
    spyOn(router,'navigate')
    spyOn(serve,'LogPostUser').and.returnValue(of({token :'abcd'}))
    component.loginUser(data);
    flush()
  }));
  // it('should loginUser throw error',fakeAsync(()=>{
  //   let data:any={
  //    value: 
  //    {email : 'jdjh',
  //     password : 'sdhgj',
  //     }
  //   }

    
  //   spyOn(serve,'LogPostUser').and.returnValue(throwError({error:{message:'error'}}))
  //   tick(100)
  //  component.loginUser(data);
  //   flush()
  // }));

  it('should call login fail',()=>{
    spyOn(router,'navigate')
    component.loginFail()
    component.forgotPass()
  })

  it('shuld call login with google',fakeAsync(()=>{
   // Arrange
   const executeCaptchaServiceSpy = spyOn(component, 'executeCaptcha');
   const signInSpy = spyOn(socialAuthService, 'signIn').and.returnValues(Promise.resolve(new SocialUser()));
   spyOn(router,'navigate')
   spyOn(serve, 'googleSignIn').and.returnValue(of({token:'abcd', idToken:'sdfsd',captcha:'sdfsd'}));
   // Act
   component.loginWithGoogle();
   tick();
   // Assert
  //  expect(executeCaptchaServiceSpy).toHaveBeenCalled();
   expect(signInSpy).toHaveBeenCalledWith(GoogleLoginProvider.PROVIDER_ID);
   expect(serve.googleSignIn).toHaveBeenCalled();
   expect(router.navigate).toHaveBeenCalled()
   flush();
  }))

  it('shuld call login with google',fakeAsync(()=>{
    // Arrange
    const executeCaptchaServiceSpy = spyOn(component, 'executeCaptcha');
    const signInSpy = spyOn(socialAuthService, 'signIn').and.returnValues(Promise.resolve(new SocialUser()));
    spyOn(router,'navigate')
    spyOn(serve, 'googleSignIn').and.returnValue(throwError({error:{message:'error'}}));
    // Act
    component.loginWithGoogle();
    tick(1000);
    // Assert
   //  expect(executeCaptchaServiceSpy).toHaveBeenCalled();
    // expect(signInSpy).toHaveBeenCalledWith(GoogleLoginProvider.PROVIDER_ID);
    // expect(serve.googleSignIn).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalled()
    flush();
   }))

});








  
  
 





  

// new









// import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

// import { LoginComponent } from './login.component';
// import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
// import environment from 'src/app/environment';
// import { ToastrModule } from 'ngx-toastr';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
// import { FormsModule } from '@angular/forms';
// import { MyCaptchaService } from '../../localStorageService/my-captcha.service';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let captchaService :MyCaptchaService
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ LoginComponent ],
//       providers:[
//         { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
//         ReCaptchaV3Service,
//         {
//           provide: 'SocialAuthServiceConfig',
//           useValue: {
//             autoLogin: false,
//             providers: [
//               {
//                 id: GoogleLoginProvider.PROVIDER_ID,
//                 provider: new GoogleLoginProvider(
//                   environment.clientId
//                 )
//               },
//             ],
//             onError: (err) => {
//               console.error(err);
//             }
//           } as SocialAuthServiceConfig,
//         },
//         SocialAuthService,
      
//       ],
//       imports:[
//         ToastrModule.forRoot(),
//         FormsModule,
//         HttpClientTestingModule
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     captchaService=TestBed.inject(MyCaptchaService)
//   });
  

//   it('should create', fakeAsync(() => {
//     tick(1000)
//     expect(component).toBeTruthy();
//     flush()
//   }));
// });







