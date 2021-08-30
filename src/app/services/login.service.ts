import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject=new Subject<boolean>();
  constructor(private _http:HttpClient) { }


public getCurrentUser()
{
  return this._http.get(`${baseUrl}/current-user`)
}
  //generate token

  public generateToken(loginData:any){
    return this._http.post(`${baseUrl}/generate-token`,loginData)
  }

  //login user
  public loginUser(token:any){
localStorage.setItem("token",token);
// this.loginStatusSubject.next(true);
return true;
  }

  //isloggedin
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }
//logout Remove token from local storage

public logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
  return true;
}

//get token
public getToken(){
  return localStorage.getItem('token');
}

//set userDetail
public SetUser(user:any){
  localStorage.setItem("user",JSON.stringify(user));
}

//get User
public getUser(){
  let UserStr=localStorage.getItem("user");
  if(UserStr!=null){
    return JSON.parse(UserStr);
  }else{
    this.logout();
    return null;

  }


}

//get User Role 
public getUserRole(){
  let user=this.getUser();
  return user.authorities[0].authority;

}
//delete
public deleteUser(userId:any){
  return this._http.delete(`${baseUrl}/user/${userId}`);
}


}
