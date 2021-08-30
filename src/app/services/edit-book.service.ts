import { HttpClient } from '@angular/common/http';

import { Product } from './../pages/admin/models/product';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EditBookService {

  constructor(private http:HttpClient) { }

  sendProduct(product:Product){
    return this.http.post(`${baseUrl}/product/add`,product);
  }
}
