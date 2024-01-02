// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { RegisrationComponent } from './regisration.component';

// describe('RegisrationComponent', () => {
//   let component: RegisrationComponent;
//   let fixture: ComponentFixture<RegisrationComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ RegisrationComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(RegisrationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });














import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RegisrationComponent } from './regisration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';
import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';
import { of, throwError } from 'rxjs';
import { ROUTES, Router, RouterModule } from '@angular/router';
import { AuthRoutingModule } from '../auth-routing.module';
import { HttpClientModule } from '@angular/common/http';


describe('RegisterComponent', () => {
  let component: RegisrationComponent;
  let fixture: ComponentFixture<RegisrationComponent>;
  let httpService: StoreAtURLService;
  let myRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let serve: StoreAtURLService;
  let toastrService: ToastrService;
  let location: Location;
  let router: Router;
  let captchaService:MyCaptchaService;

let r:Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisrationComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
        RecaptchaV3Module,
      RouterModule,
        FormsModule,AuthRoutingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: Router, useValue: myRouter },
        
        StoreAtURLService,
        Router,
        MyCaptchaService,
        ToastrService,
        ReCaptchaV3Service,
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI',
        },
      ],
    }).compileComponents();

   
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(RegisrationComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(StoreAtURLService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastrService = TestBed.inject(ToastrService);
    serve=TestBed.inject(StoreAtURLService);
    captchaService = TestBed.inject(MyCaptchaService);
   
    fixture.detectChanges();
    router.initialNavigation();
  // r=TestBed.inject(Router)as jasmine.SpyObj<Router>;
      location = TestBed.inject(Location);
  
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register the account',fakeAsync(() => {
    // component.token = 'abcd';
    let url = '/auth/login';
    let obj ={ name: undefined, email: undefined, password: undefined, company: undefined, captcha: undefined }
    spyOn(serve, 'RegistrePostUser').and.returnValue(of({}));
    spyOn(router, 'navigate');
    spyOn(captchaService,'execute').and.returnValue(Promise.resolve('dummyValue'));
    // spyOn(component,'executeCaptcha');
    component.ngOnInit();
    component.submit({});
    //tick(10000);
    // expect(component.executeCaptcha).toHaveBeenCalled()
    //expect(captchaService.execute).toHaveBeenCalled();
    tick();
    expect(serve.RegistrePostUser).toHaveBeenCalledWith(obj);
    expect(router.navigate).toHaveBeenCalledWith([url]);
    flush()
  }));


  
  it('should throw error on register account', () => {
    // component.token = 'abcd';
    let url = '/auth/login';
    let obj ={ name: undefined, email: undefined, password: undefined, company: undefined, captcha: undefined }

    spyOn(serve, 'RegistrePostUser').and.returnValue(
      throwError({ error: { message: 'email no verified' } })
    );
    spyOn(router, 'navigate');
    component.submit({});
    expect(serve.RegistrePostUser).toHaveBeenCalledWith(obj);
  });
 
});
