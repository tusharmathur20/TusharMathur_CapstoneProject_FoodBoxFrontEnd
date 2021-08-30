import { BillingAddress } from './../pages/user/models/billing-address';
import { Payment } from './../pages/user/models/payment';
import { ShippingAddress } from './../pages/user/models/shipping-address';
import  baseUrl  from 'src/app/services/helper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }


  checkout(
  	shippingAddress: ShippingAddress,
  	billingAddress: BillingAddress,
  	payment:Payment,
  	shippingMethod:string
  	){
      
		let order ={
			"shippingAddress" : shippingAddress,
			"billingAddress" : billingAddress,
			"payment" : payment,
			"shippingMethod" : shippingMethod
		}
    return this.http.post(`${baseUrl}/checkout/checkout`,order,{responseType:'text'});
  
  
  }

  getUserOrder() {
    return this.http.get(`${baseUrl}/checkout/getUserOrder`);

  }

}
