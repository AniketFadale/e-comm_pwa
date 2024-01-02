import { TestBed } from '@angular/core/testing';

import { CaptchaServiceService } from './captcha-service.service';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import environment from 'src/app/environment';
import { MyCaptchaService } from 'src/app/seller/localStorageService/my-captcha.service';

describe('CaptchaServiceService', () => {
  let service: CaptchaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        MyCaptchaService,ReCaptchaV3Service,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
      ]
    });
    service = TestBed.inject(CaptchaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be execute',async ()=>{
    await service.execute().then((value:any)=>{
      expect(value).toBeDefined()
    }).catch((e:any)=>fail(e));
  });
});
