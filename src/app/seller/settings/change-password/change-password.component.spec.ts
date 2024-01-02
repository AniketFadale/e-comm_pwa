import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let serve : StoreAtURLService
  let router : Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      providers:[
        ToastrService
      ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve = TestBed.inject(StoreAtURLService)
    router = TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change password', () => {
    let data ={
      value:{
        new_password : '1234',
        Confirm_password:'1234',
        old_password:'12345'
      }
    }
    spyOn(serve,'changePassword').and.returnValue(of(new ArrayBuffer(0)))
    spyOn(router,'navigate')
    component.changePass(data)
    expect(serve.changePassword).toHaveBeenCalledWith({
      new_password: data.value.new_password,
      old_password: data.value.old_password,
    })
    expect(router.navigate).toHaveBeenCalled()
  });
  it('should change password throw error', () => {
    let data ={
      value:{
        new_password : '1234',
        Confirm_password:'1234',
        old_password:'12345'
      }
    }
    spyOn(serve,'changePassword').and.returnValue(throwError({error:{message:'error'}}))
    component.changePass(data)
    expect(serve.changePassword).toHaveBeenCalledWith({
      new_password: data.value.new_password,
      old_password: data.value.old_password,
    })
  });
  it('should change password throw error', () => {
    let data ={
      value:{
        new_password : '1234',
        Confirm_password:'134',
        old_password:'12345'
      }
    }
    component.changePass(data)
   
  });
});
