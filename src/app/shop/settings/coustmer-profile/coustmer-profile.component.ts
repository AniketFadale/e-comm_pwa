import { Component } from '@angular/core';
import { GetCutomerLoginService } from '../../services/get-cutomer-login.service';
import { Router } from '@angular/router';
import { UrlService } from '../../services/url.service';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-coustmer-profile',
  templateUrl: './coustmer-profile.component.html',
  styleUrls: ['./coustmer-profile.component.css']
})
export class CoustmerProfileComponent {
  constructor(private local:GetCutomerLoginService,private routes : Router,private serve :UrlService,private toast:ToastrService){
    var el: any = document.querySelector('.grecaptcha-badge');
    if(el){
      el.style.display = 'none';
    }
    this.arr = this.getlocal ? JSON.parse(this.getlocal) : this.getlocal;
    // console.log('myprofile constructor')
    this.token1 = local.getCustomerToken();
    serve.getSelf().subscribe((res:any)=>{
      this.res = res;
      // console.log('Header Works',this.res);

    });
    
    // getdata.setNav(false);
    // getdata.setlogedUser(this.res);

    
  }

  ngOnInit(){
  }
  deleteKey=true;
  res:any;
  token1: any;
  
  arr:any;
  
  edit_var:boolean=true;
  profile:any={
    name:'',
    email:'',
    // CompanyName : 'c',
    // Role:'d',
    // password:'123'
  };
  getData(){
    this.serve.getSelf().subscribe((res:any)=>{
      this.res = res;
      console.log('Header Works',this.res);

    });
  }

  deleteAccount(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serve.DeleteAccount().subscribe((res)=>{
          console.log(res);
          Swal.fire(
            'Deleted!',
            'Your Account has been deleted.',
            'success'
          )
          // this.toast.success('Deleted Successfully','Account');
          this.routes.navigate(['shop/auth/login']);
          this.local.clearLocal();
        },error=>{
          console.log(error);
          
        })
        
      }
    })
    // let c = confirm('Do you want to delete the account ?')
    // if(c){
    //   this.serve.DeleteAccount().subscribe((res)=>{
    //     console.log(res);
    //     this.toast.success('Deleted Successfully','Account');
    //     this.routes.navigate(['shop/auth/login']);
    //     this.local.clearLocal();
    //   },error=>{
    //     console.log(error);
        
    //   })

    // }else{
    //   this.toast.error('Canceled')
    // }

  }
  getlocal = localStorage.getItem('customerLogin');
  
  logout(){

    this.local.clearLocal();
  //   console.log('outttt');
  //   this.guard.grd = false;
    this.routes.navigate(['shop/auth/login']);
  }

  myName:string="Ajay";
  selectedImg:any;
  editProfile(){
//     this.routes.navigate(['setting','company-info'])
    this.edit_var=false;
    this.profile["name"]=this.res.name;
    this.profile["email"]=this.res.email;
//     this.profile["CompanyName"]=this.res._org.name;
//     this.profile["Role"]=this.res.role;
//     this.profile["isEmailVerified"]=this.res.isEmailVerified;

    
  }
  updateProfile(){
    console.log(this.profile);
    this.serve.updateCustomerProfile(this.profile).subscribe((res)=>{
      console.log(res);
      // this.res=res
      this.toast.success('Updated Successfully','Profile') ;
      this.croppedImage=undefined;
      this.edit_var=true;
      this.getData();
    },error=>{
      console.log(error);
      
    })
  }
  addImg(event:any){
    this.selectedImg = event.target.files[0]
    
    // console.log(this.selectedImg.name);
    
    if(!this.selectedImg){
      this.toast.error('IMG not selected')
    }
  }

  updateProfilePic(){
    console.log(this.selectedImg);
      let myformData = new FormData()
      myformData.append('picture' , this.selectedImg)
      this.serve.updateCustomerProfilePhoto(myformData).subscribe((res)=>{
        console.log(res);
        // this.res=res;
        this.toast.success('Added Successfully','Profile Picture')
        this.getData()
        
      },error=>{
        console.log(error);
        
      })

  }
  goBack(){
    this.edit_var=!this.edit_var
  }

 

deleteProfilePic(){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.serve.RemoveCustomerProfilePhoto().subscribe((res)=>{
        console.log(res);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        // this.toast.success('Deleted','Successfully')
        this.getData()
        
       
  
      },error=>{
        this.toast.error('Canceled');
        console.log(error);
        
      })
      
    }
  })
  // var c = confirm("Are you sure you want to delete Profile Picture?");
  // if(c){
  //   this.serve.RemoveCustomerProfilePhoto().subscribe((res)=>{
  //     console.log(res);
      
  //     this.toast.success('Deleted','Successfully')
  //     this.getData()
      
     

  //   },error=>{
  
  //     console.log(error);
      
  //   })
  // }

  }
  imageChangedEvent: any = '';
    croppedImage: any = '';

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(this.croppedImage);
        this.selectedImg= base64ToFile(this.croppedImage)  
    }
    imageLoaded(image: LoadedImage) {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
}
