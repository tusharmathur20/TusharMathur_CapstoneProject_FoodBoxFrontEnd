
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(private http:HttpClient) { }

  getProduct(id:number){
return this.http.get(`${baseUrl}/product/`+id);

  }

  searchProduct(keyword:string){
    return this.http.post(`${baseUrl}/product/searchProduct`,keyword)
  }
}
