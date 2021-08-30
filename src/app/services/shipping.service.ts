import  baseUrl  from 'src/app/services/helper';
import { UserShipping } from './../pages/user/models/user-shipping';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http:HttpClient) { }


  newShipping(shipping: UserShipping) {
    return this.http.post(`${baseUrl}/shipping/add`,shipping,{responseType:'text'})

  }

  getUserShippingList() {
  return this.http.get(`${baseUrl}/shipping/getUserShippingList`)
  }

  removeShipping(id:number){
    return this.http.post(`${baseUrl}/shipping/remove`,id,{responseType:'text'})
  
  }

  setDefaultShipping(id:number){
    return this.http.post(`${baseUrl}/shipping/setDefault`,id,{responseType:'text'})
 
  }

}
