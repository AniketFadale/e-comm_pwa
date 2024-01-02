import { Component, OnInit } from '@angular/core';
import { StoreAtURLService } from 'src/app/seller/localStorageService/store-at-url.service';
import { GetdataService } from 'src/app/seller/localStorageService/getdata.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  lim: number = 10;
  // constructor
  constructor(
    private toast: ToastrService,
    private serve: StoreAtURLService,
    private getData: GetdataService
  ) {
    serve.GetAllUsers(this.parameters).subscribe(
      (res) => {
        // console.log(res);
        this.res = res;
        this.admin_id = this.res.results[0]._id;
        // console.log(this.admin_id);

        this.lim = this.res.totalResults;
      },
      (error) => {
        toast.error(error.error.message);
      }
    );
    this.edit = true;
    this.creat = true;
    getData.setNav(false);
    getData.myVar.subscribe((data) => {
      this.creat = data;
      // console.log(this.creat);
    });
  }

  ngOnInit(): void {


  }

  onTableDataChange(event: any) {
    // alert(event);

    this.parameters.page = event;
    this.callData();
  }

  // globle vars
  admin_id!: string;
  pre = true;
  next = false;
  pg2 = false;
  pg1 = false;
  res: any;

  creat!: boolean;
  edit!: boolean;
  index!: number;
  id: string = '';
  sort: string = 'role';
  NumberOfUser: string = '5';

  EditUser = {
    name: '',
    email: '',
    password: '',
  };
  SearchedName: string = '';
  parameters = {
    limit: 5,
    page: 1,
    sortBy: 'default',
  };

  // functions

  //edit key of table
  editUser(index: any) {
    this.EditUser.name = this.res.results[index].name;
    this.EditUser.email = this.res.results[index].email;
    this.id = this.res.results[index]._id;
    this.index = index;
    // console.log('this one',this.res.results[0]);
    this.edit = !this.edit;
  }
  //delete key of table
  deleteUser(index: any) {
    // console.log(this.res.results[index]._id);
    if (this.res.results[index]._id != this.admin_id) {
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
          this.serve.DeleteUser(this.res.results[index]._id).subscribe(
            (res:any) => {
              // console.log('delete',res);
              this.serve.GetAllUsers(this.parameters).subscribe((res) => {
                // console.log(res);
                this.res = res;
              });
              // this.toast.warning('Removed successfully', 'User');
              Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            },
            (error:any) => {
              this.toast.error(error.error.message);
            }
          );
          
        }
      })
     
    } else {
      this.toast.error('Can`t be deleted', 'Main Admin');
    }
  }

  //to show data
  callData() {
    if (this.SearchedName) {
      this.serve.SearchByName(this.SearchedName, this.parameters).subscribe(
        (res) => {
          this.res = res;
        },
        (error) => {
          this.toast.error(error.error.message);
        }
      );
    } else {
      this.serve.GetAllUsers(this.parameters).subscribe(
        (res) => {
          // console.log(res);
          this.res = res;
        },
        (error) => {
          alert(error.error.message);
        }
      );
    }
  }

  //to create new user

  CreateUser(user: NgForm) {
    this.serve.CreateNewUser(user?.value).subscribe(
      (res1) => {
        // console.log(res1);

        this.callData();
        this.getData.setboolvar(true);
        this.toast.success('Added Successfully', 'New User');
        user.form.reset();
        this.creat = true;
      },
      (error) => {
        // alert(error.error.message);
        this.toast.error(error.error.message, 'Error');
      }
    );
  }

  //to edit role of user

  editRole(index: any) {
    let value = this.res.results[index].role;
    let role = value;

    this.serve.EditRole(this.res.results[index]._id, role).subscribe(
      (res) => {
        // console.log('rolllll',res);
        this.toast.success('Updated Successfully', 'Role');
      },
      (error) => {
        this.toast.error(error.error.message, 'Error');
        // alert(error.error.message);
      }
    );
  }

  //to edit info of user

  editInfo() {
    this.serve.EditInfo(this.EditUser, this.id).subscribe(
      (res) => {
        // console.log(res);
        this.callData();
        this.edit = !this.edit;
        this.toast.success('Updated successfully', 'user');
      },
      (error) => {
        // alert(error.error.message);
        this.toast.error(error.error.message, 'Error');
      }
    );
    // console.log('newwwwww edit',this.id);
  }
  flagEditUser(){
    this.edit = !this.edit;
  }

  //to hide and show divs

  flag(userForm: NgForm) {
    userForm.resetForm();
    this.creat = !this.creat;
    this.getData.setboolvar(true);
    // console.log(this.creat)
  }

  //to show custom number of users

  NumOfUserTOShow() {
    // alert(this.parameters.limit)
    this.parameters.page = 1;
    this.callData();
  }
  PaginationAtNumber(numberOfPage: number) {
    // alert(numberOfPage);
    this.parameters.page = numberOfPage;
    this.callData();
  }

  //for sorting purpose

  sortBy() {
    // alert(this.sort)
    this.parameters.page = 1;
    this.callData();
  }

  // to search by name

  sortByName() {
    this.parameters.page = 1;
    // console.log(this.SearchedName);
    if (!this.SearchedName) {
      this.callData();
    } else {
      this.serve.SearchByName(this.SearchedName, this.parameters).subscribe(
        (res) => {
          // console.log(res);
          this.res = res;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
