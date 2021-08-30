
import { User } from './../pages/user/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  //add user
  public addUser(user:any){
return this._http.post(`${baseUrl}/user/`,user);
  }

  updateUserInfo(user: User, newPassword: string, currentPassword: string) {
 
    let userInfo = {
      "id" : user.id,
      "firstName" : user.firstName,
      "lastName" : user.lastName,
      "username" : user.username,
      "currentPassword" : currentPassword,
      "email" : user.email,
      "newPassword" :newPassword
    };
    return this._http.post(`${baseUrl}/user/updateUserInfo`,userInfo);
}
}