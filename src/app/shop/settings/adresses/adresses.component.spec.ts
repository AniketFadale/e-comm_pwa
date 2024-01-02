import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressesComponent } from './adresses.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { UrlService } from '../../services/url.service';

describe('AdressesComponent', () => {
  let component: AdressesComponent;
  let fixture: ComponentFixture<AdressesComponent>;
  let serve :UrlService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressesComponent ],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(AdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(UrlService)

  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should GoToaddAddress',()=>{
    spyOn(serve,'getSelf').and.returnValue(of({}))
    component.GoToaddAddress()
    component.getProfile()
  })

  it('should getadd',()=>{
    spyOn(serve,'GetSavedAddress').and.returnValue(of({}))
    component.getadd()
  })

  it('should addAddress',()=>{

    let add ={
      street:'',
      addressLine2:'',
      city:'',
      state:'',
      pin:'122'
    }

    spyOn(serve,'AddNewAddress').and.returnValue(of({}))
    component.addAddress(add)
  })

  it('should addAddress throw error',()=>{

    let add ={
      street:'',
      addressLine2:'',
      city:'',
      state:'',
      pin:'122'
    }

    spyOn(serve,'AddNewAddress').and.returnValue(throwError({error:{message:'error'}}))
    component.addAddress(add)
  })
// not completed swal 
  it('should deleteAdd',()=>{
    component.res=[{_id:'abcd'}]
    component.deleteAdd(0)
  })

  // here


  it('should EditAdd',()=>{
    component.res=[{
      street:'',
      addressLine2:'',
      city:'',
      state:'',
      pin:'122'
    }]
    component.EditAdd(0)
  })

  it('should cancleAdd',()=>{
    component.cancleAdd(0)
  })

  it('should UPadateAdd',()=>{
    component.res=[{
      street:'',
      addressLine2:'',
      city:'',
      state:'',
      pin:'122'
    }]
    spyOn(serve,'UpadateAddress').and.returnValue(of({}))
    component.UPadateAdd(0)
  })


  it('should UPadateAdd throw error',()=>{
    component.res=[{
      street:'',
      addressLine2:'',
      city:'',
      state:'',
      pin:'122'
    }]
    spyOn(serve,'UpadateAddress').and.returnValue(throwError({error:{message:'error'}}))
    component.UPadateAdd(0)
  })
});
