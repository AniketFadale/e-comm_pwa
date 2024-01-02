import { TestBed } from '@angular/core/testing';

import { GetCutomerLoginService } from './get-cutomer-login.service';
import { of } from 'rxjs';

describe('GetCutomerLoginService', () => {
  let service: GetCutomerLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCutomerLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getCustomerToken',()=>{
    service.getCustomerToken()
  })
    it('should setCustomerToken',()=>{
    service.setCustomerToken('abcd')
  })
    it('should clearLocal',()=>{
    service.clearLocal()
  })
  
});
