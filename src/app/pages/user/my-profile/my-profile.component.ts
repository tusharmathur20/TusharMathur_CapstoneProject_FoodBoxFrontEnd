import { Subject } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

user:any=null;



  constructor(private logIn:LoginService,private userService:UserService) { }


  getUser(){
    this.user=this.logIn.getUser();
    this.logIn.loginStatusSubject.asObservable().subscribe(data=>{
    
      this.user=this.logIn.getUser();
  })
}


 
  ngOnInit(): void {
  }

}
