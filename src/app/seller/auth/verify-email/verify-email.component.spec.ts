import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router ,ActivatedRoute} from '@angular/router';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyCaptchaService } from '../../localStorageService/my-captcha.service';
import { RECAPTCHA_V3_SITE_KEY ,ReCaptchaV3Service } from 'ng-recaptcha';
import environment from 'src/app/environment';
import { Token } from '@angular/compiler';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let activatedRouteMock: ActivatedRoute;
  let serve:StoreAtURLService
  let router :Router
  let toast : ToastrService
  let myCaptchaService:MyCaptchaService
  const mockActivatedRoute = {
    queryParams: of({token:'1234'})
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEmailComponent ],
      providers:[
        ToastrService,
        ReCaptchaV3Service,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
        MyCaptchaService,
        Router,
        StoreAtURLService,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
      ],
      imports:[
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router=TestBed.inject(Router)
    toast=TestBed.inject(ToastrService)
    myCaptchaService=TestBed.inject(MyCaptchaService)
    serve=TestBed.inject(StoreAtURLService)
  })

  it('should create', () => {
    spyOn(serve,'VerifyAccount').and.returnValue(of({token:'1234'}))
    TestBed.createComponent(VerifyEmailComponent);
    expect(component).toBeTruthy();
    expect(serve.VerifyAccount).toHaveBeenCalled()
  });

  
});




