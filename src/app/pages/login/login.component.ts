import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:'',
  }

  constructor(private router:Router,private _snack:MatSnackBar,private _login:LoginService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    // console.log("Login Button");
    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this._snack.open("Username is Required !!",'',{
        duration:3000,
      });
      return;

    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this._snack.open("Password is Required !!",'',{
        duration:3000,
      });
      return;
    
  }

  //Request Server to generate token
  this._login.generateToken(this.loginData).subscribe(
    (data:any)=>{
// console.log("success");
// console.log(data);

//login...
          this._login.loginUser(data.token);
          this._login.getCurrentUser().subscribe(
            (user:any)=>{
this._login.SetUser(user);
// console.log(user);
//redirect...ADMIN or user
if(this._login.getUserRole()=="ADMIN"){
  //  window.location.href='/admin';
   this.router.navigate(['admin']);
   this._login.loginStatusSubject.next(true);

}else if(this._login.getUserRole()=="NORMAL"){
//  window.location.href=
//                 '/user-dashboard';
                this.router.navigate(['user-profile/user-dashboard']);
                this._login.loginStatusSubject.next(true);
}else{
  this._login.logout();
  location.reload();
}




            },

            )



    },
  (error)=>{
    console.log("Error !! ");
    console.log(error);
    this._snack.open("Invalid Credentials !!",'',{
      duration:3000,
    });
  }
  )
}
}
