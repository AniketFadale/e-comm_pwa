import { TestBed } from '@angular/core/testing';

import { ShopGuardGuard } from './shop-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UrlService } from '../services/url.service';

describe('ShopGuardGuard', () => {
  let guard: ShopGuardGuard;
  let router :Router
  let local :UrlService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    guard = TestBed.inject(ShopGuardGuard);
    router =TestBed.inject(Router)
    local =TestBed.inject(UrlService)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should be canActivate', () => {


    const route : ActivatedRouteSnapshot = null!;
    const state : RouterStateSnapshot=null!;

    spyOn(router, 'createUrlTree');
    spyOn(local, 'guardner').and.returnValue(
      Promise.reject({ meaasge: 'error' })
    )
    guard.canActivate(route, state);
    expect(local.guardner).toHaveBeenCalled();
  });
});
