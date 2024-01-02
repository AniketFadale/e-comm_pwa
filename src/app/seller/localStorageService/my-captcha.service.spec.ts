import { TestBed } from '@angular/core/testing';

import { MyCaptchaService } from './my-captcha.service';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import environment from 'src/app/environment';
import { throwError } from 'rxjs';

describe('MyCaptchaService', () => {
  let service: MyCaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        MyCaptchaService,ReCaptchaV3Service,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
      ]
    });
    service = TestBed.inject(MyCaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be execute',async ()=>{
    await service.execute('REGISTER').then((value:any)=>{
      expect(value).toBeDefined()
    }).catch((e:any)=>fail(e));
  });

  
});
