import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './seller/localStorageService/local-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'task1';
  constructor(private routes: Router,private local : LocalStorageService){
  
  
    let arr = local.getLocal();
    
    

  }
}
