import baseUrl  from 'src/app/services/helper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoveProductService {

  constructor(private http:HttpClient) { }

  sendProduct(productId:number){
    return this.http.post(`${baseUrl}/product/remove`,productId,  {responseType: 'text'});

  }
}
