import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { CoustmerProfileComponent } from './coustmer-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UrlService } from '../../services/url.service';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';

describe('CoustmerProfileComponent', () => {
  let component: CoustmerProfileComponent;
  let fixture: ComponentFixture<CoustmerProfileComponent>;
  let serve :UrlService
  let router :Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoustmerProfileComponent ],
      providers:[],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
        ImageCropperModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(CoustmerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(UrlService)
    router =TestBed.inject(Router)
  })
  it('should create', () => {
    spyOn(serve,'getSelf').and.returnValue(of({}))
    TestBed.createComponent(CoustmerProfileComponent);
    expect(component).toBeTruthy();
  });

  it('should getData',()=>{
    spyOn(serve,'getSelf').and.returnValue(of({}))
    component.getData()
    expect(serve.getSelf).toHaveBeenCalled()
  })

  it('should deleteAccount',fakeAsync(()=>{
    let url ='/shop/auth/login'
    spyOn(router,'navigate')
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'DeleteAccount').and.returnValues(of(response));
    component.deleteAccount()
    // expect(router.navigate).toHaveBeenCalledWith([url])
    // expect(serve)
    
  }));
  it('should deleteAccount throw error',fakeAsync(()=>{
    // spyOn(router,'navigate')
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'DeleteAccount').and.returnValues(throwError({error:{message:'error'}}));
    component.deleteAccount()
    // expect(serve.DeleteAccount).toHaveBeenCalled()
  }));

  it('should logout',()=>{
    spyOn(router,'navigate')
    component.logout()
  })

  it('should editProfile',()=>{
    component.res={
      name:'aniket',
      email:'a@gmail.com'
    }
    component.editProfile()
  })

  it('should upadte profile',()=>{
    spyOn(serve,'updateCustomerProfile').and.returnValue(of({}))
    component.updateProfile()
  })

  it('should upadte profile throwerror',()=>{
    spyOn(serve,'updateCustomerProfile').and.returnValue(throwError({error:{message:'error'}}))
    component.updateProfile()
  })

  it('shouold add img',()=>{
    component.addImg({target:{files:[]}})
  })

  it('should updateProfilePic',()=>{
    spyOn(serve,'updateCustomerProfilePhoto').and.returnValue(of({}))
    component.updateProfilePic()
  })
  it('should updateProfilePic throw error',()=>{
    spyOn(serve,'updateCustomerProfilePhoto').and.returnValue(throwError({error:{message:'error'}}))
    component.updateProfilePic()
  })

  it('should go back',()=>{
    component.goBack()
  })

  it('should deleteProfilePic',fakeAsync(()=>{
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'RemoveCustomerProfilePhoto').and.returnValues(of(response));
    component.deleteProfilePic();
  }))

  it('should deleteProfilePic throw error',fakeAsync(()=>{
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'RemoveCustomerProfilePhoto').and.returnValues(throwError({error:{message:'error'}}));
    tick()
    component.deleteProfilePic();
    flush()
  }))

  it('should fileChangeEvent',()=>{
    component.fileChangeEvent({})
  })
  // it('should imageCropped',()=>{
  //   function base64ToFile(data:any){}
  //   let event:any = {
  //     base64:''    }
  //   component.imageCropped(event)
  // })

  it('should imageLoaded',()=>{
    let img:any={}
    component.imageLoaded(img)
  })

  it('should extra functions',()=>{
    component.cropperReady()
    component.loadImageFailed()
  })
});
