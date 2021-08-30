import baseUrl  from 'src/app/services/helper';
import { UserPayment } from './../pages/user/models/user-payment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

newPayment(payment:UserPayment){
  return this.http.post(`${baseUrl}/payment/add`,payment,{responseType:'text'});
}


getUserPaymentList(){
  return this.http.get(`${baseUrl}/payment/getUserPaymentList`);
}

removePayment(id:number){
  return this.http.post(`${baseUrl}/payment/remove`,id,{responseType:'text'})
}


setDefaultPayment(id:number){
  return this.http.post(`${baseUrl}/payment/setDefault`,id,{responseType:'text'})

}
}
