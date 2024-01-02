import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let serve:StoreAtURLService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      providers:[
        ToastrService
      ],
      imports:[
        ToastrModule.forRoot(),
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        NgxPaginationModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(StoreAtURLService)
  })

  it('should create', () => {
    let res = {
      results:[{_id:'1234'}],
      totalResults:10
    }
    spyOn(serve,'GetAllUsers').and.returnValue(of(res))
    TestBed.createComponent(UsersComponent);
    expect(component).toBeTruthy();
    expect(serve.GetAllUsers).toHaveBeenCalled()
  });
  it('should create getall users error', () => {
    let res = {
      results:[{_id:'1234'}],
      totalResults:10
    }
    spyOn(serve,'GetAllUsers').and.returnValue(throwError({error:{message:'error'}}))
    TestBed.createComponent(UsersComponent);
    expect(component).toBeTruthy();
    expect(serve.GetAllUsers).toHaveBeenCalled()
  });

  it('should onTable Data Change', () => {

   component.onTableDataChange({})
   component.res = {
    results:[
      {_id:'1234'},
      {name:'aniket'},
      {email:'a@gmail.com'}
  ],
    totalResults:10
  }
   component.editUser(0)
  });


  it('should deleteUser', fakeAsync(() => {
    component.res = {
      results:[
        {_id:'1234'},
        {name:'aniket'},
        {email:'a@gmail.com'}
    ],
      totalResults:10
    }
    component.admin_id='111'
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'DeleteUser').and.returnValues(of(response));
    spyOn(serve,'GetAllUsers').and.returnValue(of({}))
    component.deleteUser(0);
    tick(10)
    expect(serve.DeleteUser).toHaveBeenCalled();
  }));

  it('should deleteUser throw error', fakeAsync(() => {
    component.res = {
      results:[
        {_id:'1234'},
        {name:'aniket'},
        {email:'a@gmail.com'}
    ],
      totalResults:10
    }
    component.admin_id='111'
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    spyOn(serve,'DeleteUser').and.returnValues(throwError({error:{message:'error'}}));
    component.deleteUser(0);
    tick(10)
    expect(serve.DeleteUser).toHaveBeenCalled();
    flush()
  }));
  it('should deleteUser else block', fakeAsync(() => {
    component.res = {
      results:[
        {_id:'1234'},
        {name:'aniket'},
        {email:'a@gmail.com'}
    ],
      totalResults:10
    }
    component.admin_id='1234'
   
    component.deleteUser(0);
   flush()
  }));


  it('should callData', fakeAsync(() => {
    let res = {
      results:[
        {_id:'1234'},
        {name:'aniket'},
        {email:'a@gmail.com'}
    ],
      totalResults:10
    }
    // component.admin_id='1234'
    component.SearchedName = 'aniket',
    component.parameters ={
      limit: 10,
      page: 1,
      sortBy: 'string'
  }
   spyOn(serve,'SearchByName').and.returnValue(of(res))
    component.callData();
    expect(serve.SearchByName).toHaveBeenCalled()
   flush()
  }));


  it('should callData throw error', fakeAsync(() => {
    let res = {
      results:[
        {_id:'1234'},
        {name:'aniket'},
        {email:'a@gmail.com'}
    ],
      totalResults:10
    }
    // component.admin_id='1234'
    component.SearchedName = 'aniket',
    component.parameters ={
      limit: 10,
      page: 1,
      sortBy: 'string'
  }
   spyOn(serve,'SearchByName').and.returnValue(throwError({error:{message:'error'}}))
    component.callData();
    expect(serve.SearchByName).toHaveBeenCalled()
   flush()
  }));
  it('should callData GetAllUsers', fakeAsync(() => {
   
    spyOn(serve,'GetAllUsers').and.returnValue(of({}))
     component.callData();
     expect(serve.GetAllUsers).toHaveBeenCalled()
    flush()
   }));
  it('should callData GetAllUsers throw error', fakeAsync(() => {
   
   spyOn(serve,'GetAllUsers').and.returnValue(throwError({error:{message:'error'}}))
    component.callData();
    expect(serve.GetAllUsers).toHaveBeenCalled()
   flush()
  }));

  it('should  CreateUser', fakeAsync(() => {
    let user : any = {form:{reset(){}}}
    spyOn(serve,'CreateNewUser').and.returnValue(of(new ArrayBuffer(0)))
     component.CreateUser(user);
     expect(serve.CreateNewUser).toHaveBeenCalled()
    flush()
   }));
   it('should  CreateUser throw error', fakeAsync(() => {
    let user : any = {form:{reset(){}}}
    spyOn(serve,'CreateNewUser').and.returnValue(throwError({error:{message:'error'}}))
     component.CreateUser(user);
     expect(serve.CreateNewUser).toHaveBeenCalled()
    flush()
   }));
   it('should  editRole', (() => {
    // let user : any = {form:{reset(){}}}
    component.res= {
      results:[
        {_id:'1234'},
        {name:'aniket'},
        {email:'a@gmail.com'},
        {role:'admin'}
    ],
      totalResults:10
    }
    spyOn(serve,'EditRole').and.returnValue(of(new ArrayBuffer(0)))
     component.editRole(0);
     expect(serve.EditRole).toHaveBeenCalled()
   }));

   it('should  editRole', (() => {
    component.res= {
      results:[
        {_id:'1234'},
        {name:'aniket'},
        {email:'a@gmail.com'},
        {role:'admin'}
    ],
      totalResults:10
    }
    spyOn(serve,'EditRole').and.returnValue(throwError({error:{message:'error'}}))
     component.editRole(0);
     expect(serve.EditRole).toHaveBeenCalled()
   }));   

   it('should  editInfo', (() => {
   
    spyOn(serve,'EditInfo').and.returnValue(of(new ArrayBuffer(0)))
     component.editInfo();
     expect(serve.EditInfo).toHaveBeenCalled()
   }));

   it('should  editInfo throw error', (() => {
   
    spyOn(serve,'EditInfo').and.returnValue(throwError({error:{message:'error'}}))
     component.editInfo();
     expect(serve.EditInfo).toHaveBeenCalled()
   }));
   it('should flagEditUser', (() => {
   
     component.flagEditUser();
     component.sortBy()
   }));

   it('should  flag', (() => {
   let user:any={resetForm(){}}
     component.flag(user);
     component.NumOfUserTOShow()
     component.PaginationAtNumber(1)
   }));

   it('should sortByName', (() => {
   
    component.sortByName()
  }));

  it('should sortByName else block', (() => {
    spyOn(serve,'SearchByName').and.returnValue(of({}))
   component.SearchedName='aniket'
    component.sortByName()
    expect(serve.SearchByName).toHaveBeenCalled()
  }));
  it('should sortByName elseblock throw error', (() => {
    spyOn(serve,'SearchByName').and.returnValue(throwError({error:{message:'error'}}))
   component.SearchedName='aniket'
    component.sortByName()
    expect(serve.SearchByName).toHaveBeenCalled()
  }));
  });
