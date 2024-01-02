import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassComponent } from './change-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UrlService } from '../../services/url.service';
import { Router } from '@angular/router';

describe('ChangePassComponent', () => {
  let component: ChangePassComponent;
  let fixture: ComponentFixture<ChangePassComponent>;
  let serve: UrlService
  let router :Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePassComponent ],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(()=>{
    serve=TestBed.inject(UrlService)
    router =TestBed.inject(Router)
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should changePass',()=>{
    spyOn(router,'navigate')
    spyOn(serve,'ChangePassword').and.returnValue(of({}))
    let data ={
      value:{
        new_password:'1234',
        Confirm_password:'1234',
        old_password:'123'
      }
    }
    component.changePass(data)
  })
  it('should changePass throw error',()=>{
    spyOn(router,'navigate')
    spyOn(serve,'ChangePassword').and.returnValue(throwError({error:{message:'error'}}))
    let data ={
      value:{
        new_password:'1234',
        Confirm_password:'1234',
        old_password:'123'
      }
    }
    component.changePass(data)
  })
  it('should changePass else block',()=>{
    spyOn(router,'navigate')
    let data ={
      value:{
        new_password:'1234',
        Confirm_password:'12344',
        old_password:'123'
      }
    }
    component.changePass(data)
  })
});
