import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import environment from 'src/app/environment';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UrlService } from '../../services/url.service';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let serve : UrlService
  let router:Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers:[
        ToastrService,
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

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(()=>{
    serve=TestBed.inject(UrlService)
    router=TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit registration form',()=>{
    let data:any = {value:{pin:122}}
    component.submit(data)
  })

  it('should submit registration form else block',()=>{
    let data:any = {value:{pin:122222}}
    spyOn(serve,'registerCustomer').and.returnValue(of({}))
    spyOn(router,'navigate')
    component.submit(data)
  })

  it('should submit registration form else block serve throw error',()=>{
    let data:any = {value:{pin:122222}}
    spyOn(serve,'registerCustomer').and.returnValue(throwError({error:{message:'error'}}))
    spyOn(router,'navigate')
    component.submit(data)
  })
});
