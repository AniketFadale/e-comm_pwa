import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localStorageService/local-storage.service';
import { StoreAtURLService } from '../localStorageService/store-at-url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,private local:StoreAtURLService) {}
  // grd: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
     
     
      return this.local.sellerGuard().catch((err)=>{
        console.log(err);
        return this.router.createUrlTree(['auth','login'])
        
      })
    // if (this.grd) {
    //   return true;
    // } else {
    //   return this.router.createUrlTree(['auth', 'login']);
      
    // }
    // return this.xy()
  }


  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      return true;
      // return this.xy();
  }
  // xy(){
  //   if (this.grd) {
  //     return true;
  //   } else {
  //     return this.router.createUrlTree(['auth', 'login']);
  //   }
  // }
}
