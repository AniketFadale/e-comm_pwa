import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UrlService } from '../services/url.service';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';

@Injectable({
  providedIn: 'root'
})
export class ShopGuardGuard implements CanActivate {
  constructor(private getdata:UrlService,private router:Router,private nav : GetdataService ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.getdata.guardner());
      // this.nav.seller.next( this.getdata.guardner())
    return this.getdata.guardner().catch((err) => {
      console.log(err)
      return this.router.createUrlTree(['shop','auth','login']);
    })
  }
  
}
