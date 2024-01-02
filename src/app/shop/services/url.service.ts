import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetCutomerLoginService } from './get-cutomer-login.service';
import { Token } from '@angular/compiler';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http:HttpClient,private local :GetCutomerLoginService ,private nav : GetdataService) { }
  url = 'https://shop-api.ngminds.com'

  // to get all products:

  getShopProducts(params:any){
    console.log(params);
    
    return this.http.get(this.url+'/shop/products',{headers:new HttpHeaders({}),params:params})
  }
  // to get single product to show info

  getOneProduct(id:string){
    
    return this.http.get(this.url+'/shop/products/'+id);
  }
  // to register custmor

  registerCustomer(payload:{}){
    return this.http.post(this.url+'/shop/auth/register',payload)
  }
  // to login customer

  loginCustomer(payload:{}){
    return this.http.post(this.url+'/shop/auth/login?captcha=false',payload)
  }

  // getData for customer Profile

  getSelf(){
    let token = this.local.getCustomerToken();
    console.log(token);
    
    return this.http.get(this.url+'/shop/auth/self',{headers:new HttpHeaders({ Authorization: 'Bearer ' + token })})
  }

  async guardner() {
    return new Promise<boolean>((resolve, reject) => {
      this.getSelf().subscribe(
        (res) => {
         
          resolve(true);
        },
        (error) => {
          
          console.log(error);

          reject(false);
        }
      );
    });
  }

  // to update email and name 

  updateCustomerProfile(payload:any){
    let token =this.local.getCustomerToken()
    return this.http.patch(this.url +'/customers/update-profile',payload,{headers:new HttpHeaders({
      Authorization : 'Bearer '+ token,
      
    })})
  }

  // to update profile picture

  updateCustomerProfilePhoto(payload:any){
    let token =this.local.getCustomerToken();
    return this.http.post(this.url+'/customers/profile-picture',payload,{headers:new HttpHeaders({
      Authorization : 'Bearer '+token,
    })})
  }

  // to remove Profile pic 

  RemoveCustomerProfilePhoto(){
    let token =this.local.getCustomerToken();
    return this.http.delete(this.url+'/customers/profile-picture',{headers:new HttpHeaders({
      Authorization : 'Bearer '+token,
    })})
  }

  // to get saved address

  GetSavedAddress(){
    let token =this.local.getCustomerToken();
    return this.http.get(this.url+'/customers/address',{headers:new HttpHeaders({
      Authorization : 'Bearer '+token,
    })})
  }

  // add new address

  AddNewAddress(payload:any){
    let token =this.local.getCustomerToken();
    return this.http.post(this.url+'/customers/address',payload,{headers:new HttpHeaders({
      Authorization : 'Bearer '+token,
    })})
  }

  // to update address

  UpadateAddress(payload:any,id:any){
    let token =this.local.getCustomerToken();
    return this.http.put(this.url+'/customers/address/'+id,payload,{headers:new HttpHeaders({
      Authorization : 'Bearer '+token,
    })})
  }

  // to delete address

  DeleteAnAddress(id:any){
    let token =this.local.getCustomerToken();
    return this.http.delete(this.url+'/customers/address/'+id,{headers:new HttpHeaders({
      Authorization : 'Bearer '+token,
    })})

  }

  // to change Password

  ChangePassword(payload:any){
    let token =this.local.getCustomerToken();
    return this.http.post(this.url+'/customers/auth/change-password',payload,{headers:new HttpHeaders({
      Authorization : 'Bearer '+token,
    })})
  }

// to delete account of custmor

  DeleteAccount(){
    let token =this.local.getCustomerToken();
    return this.http.delete(this.url+'/customers/account',{headers:new HttpHeaders({
      Authorization : 'Bearer '+token,
    })})
  }
}
