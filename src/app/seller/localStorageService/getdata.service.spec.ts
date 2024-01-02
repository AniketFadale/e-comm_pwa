import { TestBed, async } from '@angular/core/testing';

import { GetdataService } from './getdata.service';
import { BehaviorSubject } from 'rxjs';

describe('GetdataService', () => {
  let service: GetdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetdataService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should set boolvar',()=>{
    service.setboolvar(true)
  })
  
  it("should call get Nav and return boolean variable", async(() => {
    // Arrange
    let response:boolean=true;

    // Act
    service.getNav();
    service.myNav.subscribe((res:any) => {
        expect(res).toEqual(response);
    });
  }));

  it("should call get user loged or not and return boolean variable", async(() => {
    // Arrange
    let response:Object={};

    // Act
    service.getlogedUser();
    service.user.subscribe((res:any) => {
        expect(res).toEqual(response);
    });
  }));

  // it('Should testingFunction set dataLoading false from true',()=>{
    

  //   const getRequestSubject = new BehaviorSubject<boolean>(true); 
  // service.setboolvar(true);
  // expect(service.creat).toBeTrue();  
  // getRequestSubject.next(false); 

  // });

  it('should set loged User',()=>{
    let response = new BehaviorSubject<Object>({})
    service.setlogedUser({})
    service.user.next(response)
    
  })

  it('should set Nav',()=>{
    const getRequestSubject = new BehaviorSubject<boolean>(true);
    service.setNav(true)
    service.display=true
  })

});
