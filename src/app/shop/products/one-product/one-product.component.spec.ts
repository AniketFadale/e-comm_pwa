import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { OneProductComponent } from './one-product.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { SharedPipeModule } from 'src/app/shared-pipe/shared-pipe.module';
import { UrlService } from '../../services/url.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('OneProductComponent', () => {
  let component: OneProductComponent;
  let fixture: ComponentFixture<OneProductComponent>;
  let  mockActivatedRoute:any ;
  let activatedRoute:ActivatedRoute
  let serve:UrlService
  beforeEach(async () => {
    mockActivatedRoute ={
      queryParamMap:jasmine.createSpy(of({id:'sdfsd'}) as any) 
    };
    const mockParamMap: any = {
      get: () => '123', // Simulating the presence of 'id' query parameter with value '123'
      // getAll: () => [],
      // has: () => true,
      // keys: [],
    };

    await TestBed.configureTestingModule({
      declarations: [ OneProductComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: mockParamMap
        },
      ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        SharedPipeModule
      ]
    })
    .compileComponents();

  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(OneProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
    serve=TestBed.inject(UrlService)

  })

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    tick(1000)
    component.ngOnInit()
    console.log(component.productId);
    flush()
  }));

  it('should getProduct',()=>{
    // component.productId='1234'
    spyOn(serve,'getOneProduct').and.returnValues(of({images:[{}]}))
    component.getProduct()
  })

  it('should getProduct throw error',()=>{
    // component.productId='1234'
    spyOn(serve,'getOneProduct').and.returnValues(throwError({error:{message:'error'}}))
    component.getProduct()
  })

  it('should storeImg',()=>{
    component.storeImg({target:{files:[{}]}})
  })

  it('should changeImg',()=>{
    component.changeImg({target:{src:'ghfah'}})
  })

  it('should select',()=>{
    component.product={images:[{public_id:'hdaj'}]}
    component.select(0,{})
  })

  it('should select else block',()=>{

    component.product={images:[{public_id:'hdaj'}]}
    component.selectedImage=['hdaj',{}]
    component.select(0,{})
  })
  it('should select else block next if block with flag true',()=>{

    component.product={images:[{public_id:'hdaj'}]}
    component.selectedImage=[{},{}]
    component.select(0,{})
  })

  it('should selectborder',()=>{
    component.product={images:[{public_id:'hdaj'}]}
    component.selectedImage=['hdaj',{}]
    component.selectborder(0)
  })

  it('should imgzoom',()=>{
    component.imgzoom({},{})
  })

  it('should imgzoomout',()=>{
    component.imgzoomout(0)
  })

  it('should f1',()=>{
    component.f1({},{})
  })

  it('should f2',()=>{
    component.f2({},{})
  })
});
