import { TestBed, fakeAsync } from '@angular/core/testing';
import { TruncPipe } from './trunc.pipe';

describe('TruncPipe', () => {

let pipe = new TruncPipe()
  beforeEach(fakeAsync(()=>{
pipe = new TruncPipe()


  }))
  it('create an instance', () => {
    const pipe = new TruncPipe();
    let text='abcd';
    let t1=[20,'...'];
    pipe.transform(text,t1);
    expect(pipe).toBeTruthy();
  });
  it('create an if block', () => {
    const pipe = new TruncPipe();
    let text='';
    let t1=[20,'...'];
    pipe.transform(text,t1);
    expect(pipe).toBeTruthy();
  });
});
