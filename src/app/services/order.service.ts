import  baseUrl  from 'src/app/services/helper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getOrderList() {
    return this.http.get(`${baseUrl}/order/getOrderList`)
  }
}
