import { Component } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css']
})
export class AdressesComponent {
  constructor(private serve:UrlService,private toast :ToastrService){
   this.getadd();
   this.getProfile();
  }
  address={
    street: '', 
    addressLine2: '', 
    city: '',
    state: '',
    pin: ''
  }
  
  profile:any;
  res:any;
  ValidatePin:boolean=false
  EditAddress:boolean=true;
  UpdateAdd=-1
  
  
  // to hide and show the add address div

  GoToaddAddress(){
    this.EditAddress=!this.EditAddress;
  }
  // to get profile info.
  getProfile(){
    this.serve.getSelf().subscribe((profile:any)=>{
      this.profile = profile;
      console.log('Header Works',this.profile);

    });
  }

  // to get addresses

  getadd(){
   this.serve.GetSavedAddress().subscribe((res)=>{
      console.log(res);
      this.res=res;
      this.EditAddress=true
    })
  }
  
  
  // to add new addresses


  addAddress(add:any){
    if(add.pin){
      this.ValidatePin=true;
    }
    this.address.street=add.street
    this.address.addressLine2=add.addressLine2
    this.address.city=add.city
    this.address.state=add.state
    this.address.pin=add.pin

    this.serve.AddNewAddress(this.address).subscribe((res)=>{
      console.log(res);
      this.getadd();
    },error=>{
      this.toast.error(error.error.message)
      console.log(error);
      
    })

    // console.log(add);
    
  }

  // Delete address


  deleteAdd(index:any){
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
        this.serve.DeleteAnAddress(this.res[index]._id).subscribe((res)=>{
          console.log(res);
          this.getadd();
          // this.toast.success('Deleted Successfully','Address')
          Swal.fire(
            'Deleted!',
            'Your Address has been deleted.',
            'success'
          )
        },error=>{
          console.log(error);
          this.toast.error('failed')
        })
        
      }
    })

    // let c= confirm('Do you want to Delete')
    // if(c){

    //   this.serve.DeleteAnAddress(this.res[index]._id).subscribe((res)=>{
    //     console.log(res);
    //     this.getadd();
    //     this.toast.success('Deleted Successfully','Address')
    //   },error=>{
    //     console.log(error);
    //     this.toast.error('failed')
    //   })
    // }
  }

  // to update a address

  EditAdd(index:any){
    this.address.street=this.res[index].street
    this.address.addressLine2=this.res[index].addressLine2
    this.address.city=this.res[index].addressLine2
    this.address.state=this.res[index].state
    this.address.pin=this.res[index].pin

    this.UpdateAdd=index;
    
  }
  cancleAdd(index:any){
    this.UpdateAdd=-1
  }
  UPadateAdd(index:any){
    this.serve.UpadateAddress(this.address,this.res[index]._id).subscribe((res)=>{
      console.log(res);
      this.toast.success('Updated Succesfully','Address')
      this.UpdateAdd=-1;
      this.getadd()
    },error=>{
      console.log(error);
      this.toast.error('Failed','Update')
      
    })
    // alert(index)
  }
}
