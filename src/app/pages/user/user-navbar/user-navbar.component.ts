import { Product } from './../../admin/models/product';
import { NavigationExtras, Router } from '@angular/router';
import { GetProductService } from './../../../services/get-product.service';

import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
isLoggedIn=false;
keyword: string;
user:any=null;
productList:Product[]=[];

  constructor(public login:LoginService,private product:GetProductService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    // this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
  })
  }

  


  logOut(){
this.login.logout();
window.location.reload();
this.login.loginStatusSubject.next(false);
  }
}
