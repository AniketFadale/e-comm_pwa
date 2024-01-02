import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreAtURLService } from '../../localStorageService/store-at-url.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let serve : StoreAtURLService
  let toast : ToastrService
  let router : Router
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductComponent ],
      providers:[
        StoreAtURLService,
        ToastrService,
        
      ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
        NgxDropzoneModule,
        AngularEditorModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serve=TestBed.inject(StoreAtURLService)
    toast = TestBed.inject(ToastrService)
    router=TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product',()=>{
    function resetfun (){}
    let dummyProduct:any = {
      value:{
        name : 'aniket',
        description:'abcd',
        price:'1111',
      },
      reset : resetfun
    }
    spyOn(serve ,'addProduct').and.returnValue(of({}))
    spyOn(toast,'success')

    component.addProduct(dummyProduct)
    
  })

  it('should add product throw error',()=>{
    function resetfun (){}
    let dummyProduct:any = {
      value:{
        name : 'aniket',
        description:'abcd',
        price:'1111',
      },
      reset : resetfun
    }
    spyOn(serve ,'addProduct').and.returnValue(
      throwError({ error: { massage: 'password not change' } })
    );
    spyOn(toast,'success')

    component.addProduct(dummyProduct)
    
  })

  it('should store image',()=>{
    component.storeImg({target:{files:[{}]}})
    component.onSelect({addedFiles:[]})
    component.onRemove({})
    
  })


});
