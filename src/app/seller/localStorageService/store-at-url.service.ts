import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from'@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import{LocalStorageService}from'src/app/seller/localStorageService/local-storage.service'
@Injectable({
  providedIn: 'root'
})
export class StoreAtURLService {


  constructor(private http : HttpClient , private local:LocalStorageService) { 
    // this.getUser();
  
    try{
      this.token=JSON.parse(localStorage.getItem('token')|| '[]');
    }catch(err){
      console.log(err)
    }
    // console.log(token)
    console.log(this.token, "From Service");
    this.httpOption = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'bearer '+this.token  })
    }
    
  }
  
  url = 'https://shop-api.ngminds.com/auth/self '
  httpOption :any;
  token:any;

  // get user

  getUser():any{
    
    let tok=JSON.parse(localStorage.getItem('token')||'[]')

    this.httpOption = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'bearer '+tok  })
    }
    return this.http.get('https://shop-api.ngminds.com/auth/self', this.httpOption)
  } 
  
  // guard Promisess

  sellerGuard(){
    return new Promise<boolean>((resolve,reject)=>{
      this.getUser().subscribe((res:any)=>{
        resolve(true)
      },(error:any)=>{
        reject(false)
      })
    })
  }
  
  // login user

  LogPostUser(user: any):Observable<any>{
    console.log(user);
    
    return this.http.post('https://shop-api.ngminds.com/auth/login?captcha=false',user)
  }
  // registre user
  RegistrePostUser(user:any){
    return this.http.post('https://shop-api.ngminds.com/auth/register',user)
  }
  // get company info
  CompanyInfo(user:any){

    return this.http.patch('https://shop-api.ngminds.com/users/org',user,this.httpOption)
  }

  // get users list
  GetAllUsers(user:any){
    // console.log(user);
    let headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
      
    return this.http.get('https://shop-api.ngminds.com/users',{headers:this.httpOption.headers,params:user})
  }
  CreateNewUser(user:any){
    return this.http.post('https://shop-api.ngminds.com/users',user,this.httpOption)
  }
  DeleteUser(user:string):any{
    // let subuser=user;
    return this.http.delete('https://shop-api.ngminds.com/users'+"/"+user,this.httpOption)
  }
  EditRole(user:any,role:string){
    
    return this.http.patch('https://shop-api.ngminds.com/users/role'+"/"+user,{role:role},this.httpOption)
  }
  EditInfo(user:any,id:string){
    return this.http.patch('https://shop-api.ngminds.com/users/'+id,user,this.httpOption);
  }
  SearchByName(name:string,user:{}){
    return this.http.get('https://shop-api.ngminds.com/users?name='+name,
    {headers:this.httpOption.headers,
    params:user});
  }
  changePassword(user:{}){
    return this.http.post('https://shop-api.ngminds.com/users/auth/change-password',user,this.httpOption)
  }
  forgotPassword(user:{}):any{
    return this.http.post('https://shop-api.ngminds.com/auth/forgot-password',user,this.httpOption)
  }
  resetPassword(user:{},params: string){
    return this.http.post('https://shop-api.ngminds.com/auth/reset-password?token='+params,user,)
  }
  VerifyEmail(){
    return this.http.post('https://shop-api.ngminds.com/auth/send-verification-email',null,this.httpOption)
  }
  VerifyAccount(token:any){
    return this.http.post('https://shop-api.ngminds.com/auth/verify-email?token='+token,null)

  }
  googleSignIn(user:{}){
    
    return this.http.post('https://shop-api.ngminds.com/auth/login/google',user)
    .pipe(catchError((err)=>{
      return throwError(err);
    }))
  }
  // getAllPosts(): Observable<any> {
  //   return this.http.get('https://shop-api.ngminds.com/users',this.httpOption);
  // }

  addProduct(product:any){
    return this.http.post('https://shop-api.ngminds.com/products',product, {
      headers : new HttpHeaders({
        'Authorization' : 'bearer '+this.token  })
    })
  }
  getAllProducts(param:{})
  {
    return this.http.get('https://shop-api.ngminds.com/products',{headers:this.httpOption.headers,params:param})
  }
  getSingleProduct(id:any):any{
    return this.http.get('https://shop-api.ngminds.com/products/'+id,this.httpOption)
  }
  deleteProduct(id:any):any{
    console.log(id);
    
    return this.http.delete('https://shop-api.ngminds.com/products/'+id,this.httpOption)
  }
  updateProduct(id:any,payload:any){
    return this.http.patch('https://shop-api.ngminds.com/products/'+id,payload,this.httpOption)
  }
  updateProductImage(id:any,payload:any){
    return this.http.patch('https://shop-api.ngminds.com/products/images/'+id,payload,{
      headers : new HttpHeaders({
        'Authorization' : 'bearer '+this.token,
        
      })
    })
  }
  deleteProductImage(id:any,public_id:any){
    return this.http.patch('https://shop-api.ngminds.com/products/images/'+id,public_id,{
      headers : new HttpHeaders({
        'Authorization' : 'bearer '+this.token,
        
      })
    })
  }



  // to get orderlist

  getAllOrders(params:any){
    console.log(this.token);
    
    return this.http.get('https://shop-api.ngminds.com/orders/',{headers : new HttpHeaders({
      'Authorization' : 'bearer ' + this.token,
    }),params:params})
  }

  // to get order details

  getOrderDetails(id:string){
    return this.http.get('https://shop-api.ngminds.com/orders/'+id,{headers : new HttpHeaders({
      'Authorization' : 'bearer ' + this.token,
    })})
  }

  // to deliver order

  toDeliverOrder(id: any) {
   
    return this.http.patch(`https://shop-api.ngminds.com/orders/deliver/${id}`, null, {headers : new HttpHeaders({
      'Authorization' : 'bearer ' + this.token,
    })});
  }

  // to dispatch order


  toDispatchOrder(id: any) {
   
    return this.http.patch(`https://shop-api.ngminds.com/orders/dispatch/${id}`, null, {headers : new HttpHeaders({
      'Authorization' : 'bearer ' + this.token,
    })});
  }


  //  to cancel Order

  toCancelOrder(id: any) {
    return this.http.patch(`https://shop-api.ngminds.com/orders/cancel/${id}`, null, {headers : new HttpHeaders({
      'Authorization' : 'bearer ' + this.token,
    })});
  }
}
