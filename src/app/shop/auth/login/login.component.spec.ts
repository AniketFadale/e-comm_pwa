import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import environment from 'src/app/environment';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../services/url.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let serve :UrlService
  let router : Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({id: '123'})
          }
        },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
        GetdataService,ReCaptchaV3Service,
      ],
      imports:[
        ToastrModule.forRoot(),
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(UrlService)
    router = TestBed.inject(Router)
  })

  it('should create', fakeAsync(() => {
    tick()
    expect(component).toBeTruthy();
  }));

  it('should login user',()=>{
    let data ={value:{
      name:'aniket',
      email:'a@gmail.com',
      password:'Pass@123'
    } }
    spyOn(router,'navigate')
    spyOn(serve,'loginCustomer').and.returnValue(of({token : '1234'}))
    component.captcha='1234'
    component.loginCustomer(data)
  })
  it('should login user throw error',()=>{
    let data ={value:{
      name:'aniket',
      email:'a@gmail.com',
      password:'Pass@123'
    } }
    spyOn(router,'navigate')
    spyOn(serve,'loginCustomer').and.returnValue(throwError({error:{message:'error'}}))
    component.captcha='1234'
    component.loginCustomer(data)
  })
  it('should forgot pass',()=>{
    component.forgotPass()
  })
});

// //new

// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

// import { LoginComponent } from './login.component';
// import { ActivatedRoute, Router } from '@angular/router';
// import { of } from 'rxjs';
// import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
// import environment from 'src/app/environment';
// import { ToastrModule, ToastrService } from 'ngx-toastr';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule } from '@angular/forms';
// import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';
// import { CaptchaServiceService } from '../../services/captcha-service.service';
// import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
// import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
// import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
// import { UrlService } from '../../services/url.service';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let activatedRoute: ActivatedRoute;
//   let mockActivatedRoute: any;
//   let captcha :MyCaptchaService
//   let router :Router
//   let toast : ToastrService
//   let serve : UrlService
//   let getdata : GetdataService
//   let socialAuthService :SocialAuthService
//   beforeEach(async () => {
//     mockActivatedRoute = {
//       queryParamMap: jasmine.createSpy(of({ id: 'sdfsd' }) as any),
//     };

//     const mockParamMap: any = {
//       queryParams: of({ id: '123' }),
//     };

//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: mockParamMap,
//         },
//         ReCaptchaV3Service,
//         { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
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
//         SocialAuthService
//       ],
//       imports:[
//         ToastrModule.forRoot(),
//         HttpClientTestingModule,
//         FormsModule
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   beforeEach(()=>{

//     captcha =TestBed.inject(MyCaptchaService)
//     router = TestBed.inject(Router)
//     toast=TestBed.inject(ToastrService)
//     serve=TestBed.inject(UrlService)
//     getdata=TestBed.inject(GetdataService)
//     socialAuthService =TestBed.inject(SocialAuthService)
//   })

//   it('should create', fakeAsync(() => {
//     TestBed.createComponent(LoginComponent);
//     tick()
//     expect(component).toBeTruthy();
//   }));

//   it('should login user',()=>{
//     let data ={value:{
//       name:'aniket',
//       email:'a@gmail.com',
//       password:'Pass@123'
//     } }
//     spyOn(router,'navigate')
//     spyOn(serve,'loginCustomer').and.returnValue(of({token : '1234'}))
//     component.captcha='1234'
//     component.loginCustomer(data)
//   })
// });
