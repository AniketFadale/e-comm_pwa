import { Component } from '@angular/core';
import { TruncPipe } from './trunc.pipe';
import { pipe } from 'rxjs';

describe('TruncPipe', () => {
  let trun : TruncPipe
  beforeEach(()=>{
    trun=new TruncPipe();
  });
  it('create an instance', () => {
    const pipe = new TruncPipe();
    expect(pipe).toBeTruthy();
  });
  it('should call transform',()=>{
    trun.transform('',[])
  })
});
