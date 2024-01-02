import { Component, Directive, ElementRef } from '@angular/core';
import { DealDirectiveDirective } from './deal-directive.directive';
import { GetCutomerLoginService } from 'src/app/shop/services/get-cutomer-login.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';


@Component({
  template: ` <div DealDirectiveDirective [value]="countDownDate"></div> `,
})

class MockComponent {
  countDownDate: any = new Date().getTime() + 10;
  now: any = new Date().getTime() - 10;
}

describe('DealDirectiveDirective', () => {
  let getcur:GetCutomerLoginService
  let directive : any
  let el: ElementRef<any> = {
    nativeElement: {
      __ngContext__: 1,
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:  [
        
      ],
      providers:[
        GetCutomerLoginService,
        DealDirectiveDirective, { provide: ElementRef, useValue: el }
      ],
      declarations: [
        
        DealDirectiveDirective,
        MockComponent
      ],
    }).compileComponents();
    // const fixture = TestBed.createComponent(DealDirectiveDirective);
  

     directive = TestBed.inject(DealDirectiveDirective);
    // fixture.detectChanges();
    getcur=TestBed.inject(GetCutomerLoginService)
  });

  it('should create an instance', fakeAsync(() => {
    let el:any =ElementRef;
    let getCurrency:any =GetCutomerLoginService
    const directive = new DealDirectiveDirective(el,getCurrency);
    tick(100)
    expect(directive).toBeTruthy();
  }));
  
  it('should set currency ',()=>{
    getcur.currency.next('c')
   directive.ngOnInit()
    expect(directive.currency).toEqual('c')
  })
  
  it('should set currency if condition ',fakeAsync(()=>{
    getcur.currency.next('c')
    directive.deal={
      ends:'2022-01-01T12:00:00'
    }
   directive.ngOnInit()
   tick(1000)
    expect(directive.currency).toEqual('c')
  }))



});
