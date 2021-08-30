import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../pages/admin/models/product';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(private http:HttpClient) { }

  sendProduct(product:Product){
return this.http.post(`${baseUrl}/product/add`,product);
  }
}
