import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  constructor(private Userservice:UserService,private _snack:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  }

  ngOnInit(): void {
  }


  formSubmit(){
  console.log(this.user);
  if(this.user.username==''|| this.user.username==null){
   this._snack.open("Username is Required !! ",'',{
     duration:3000,
    
   });
    return;
  }
  if(this.user.firstName==''|| this.user.firstName==null){
    this._snack.open("Firstname is Required !! ",'',{
      duration:3000
    });
    return;
  }
  if(this.user.lastName==''|| this.user.lastName==null){
    this._snack.open("Lastname is Required !! ",'',{
      duration:3000
    });
    return;
  }
  if(this.user.email==''|| this.user.email==null){
    this._snack.open("Email is Required !! ",'',{
      duration:3000
    });
    return;
  }
  if(this.user.password==''|| this.user.password==null){
    this._snack.open("Password is Required !! ",'',{
      duration:3000
    });
    return;
  }
  if(this.user.phone==''|| this.user.phone==null){
    this._snack.open("Phone is Required !! ",'',{
      duration:3000
    });
    return;
  }
 

  //add user
  this.Userservice.addUser(this.user).subscribe(
    (data:any)=>{
// console.log(data)
Swal.fire('Success','Succssfully Registered  , User Id:  '+data.id,'success');

    },
    (error)=>{
      console.log(error)
      this._snack.open("Something went Wrong ! ",'',{
        duration:3000
      });
    }
  )
  }

}
