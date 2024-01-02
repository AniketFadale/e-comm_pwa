import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StoreAtURLService } from '../localStorageService/store-at-url.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router :Router
  let local :StoreAtURLService
  // let route : ActivatedRouteSnapshot;
  // let state :
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router =TestBed.inject(Router)
    local =TestBed.inject(StoreAtURLService)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
   it('should be canActivate', () => {


    const route : ActivatedRouteSnapshot = null!;
    const state : RouterStateSnapshot=null!;

    spyOn(router, 'createUrlTree');
    spyOn(local, 'sellerGuard').and.returnValue(
      Promise.reject({ meaasge: 'error' })
    )
    guard.canActivate(route, state);
    expect(local.sellerGuard).toHaveBeenCalled();
  });
  
  it('should be canActivateChild', () => {


    const route : ActivatedRouteSnapshot = null!;
    const state : RouterStateSnapshot=null!;

    spyOn(router, 'createUrlTree');
    
    guard.canActivateChild(route, state);
  });
});
