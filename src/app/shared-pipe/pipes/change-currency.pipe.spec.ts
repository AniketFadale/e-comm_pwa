import { fakeAsync } from '@angular/core/testing';
import { ChangeCurrencyPipe } from './change-currency.pipe';
import { of } from 'rxjs';

describe('ChangeCurrencyPipe', () => {

  let pipe = new ChangeCurrencyPipe()
  beforeEach(fakeAsync(()=>{
    pipe = new ChangeCurrencyPipe()
  }))
  it('create an instance rupees', () => {
    // const pipe = new ChangeCurrencyPipe();
    pipe.transform('1000','₹')
    expect(pipe).toBeTruthy();
  });

   it('create an instance ero', () => {
    // const pipe = new ChangeCurrencyPipe();
    pipe.transform('1000','€')
    expect(pipe).toBeTruthy();
  });

   it('create an instance canedian dollars', () => {
    // const pipe = new ChangeCurrencyPipe();
    pipe.transform('1000','£')
    expect(pipe).toBeTruthy();
  });

   it('create an instance dollars', () => {
    // const pipe = new ChangeCurrencyPipe();
    pipe.transform('1000','$')
    expect(pipe).toBeTruthy();
  });

   it('create an instance else', () => {
    // const pipe = new ChangeCurrencyPipe();
    pipe.transform('1000',' ')
    expect(pipe).toBeTruthy();
  });

  
  
});
