import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get local',()=>{
    service.getLocal()
  })

  it('should return bollean',()=>{
    service.returnBool()
    const result = service.returnBool();
    expect(result).toBe(true);
  })

  it('should set local',()=>{
    
    service.setLocal('abcd')
  })

  it('should clar local',()=>{
    service.clearLocal()
    
  })
});
