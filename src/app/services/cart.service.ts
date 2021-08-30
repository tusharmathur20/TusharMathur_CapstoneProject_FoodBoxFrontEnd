import  baseUrl  from 'src/app/services/helper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  addItem(id:number, qty: number) {

  	let cartItemInfo = {
  		"productId" : id,
  		"qty" : qty
  	}
    return this.http.post(`${baseUrl}/cart/add`,cartItemInfo,{responseType:'text'});
  
  }

  getCartItemList() {
    return this.http.get(`${baseUrl}/cart/getCartItemList`);

  }

  getShoppingCart() {
    return this.http.get(`${baseUrl}/cart/getShoppingCart`);

  }

  updateCartItem(cartItemId: number, qty: number) {
  
  	let cartItemInfo = {
  		"cartItemId" : cartItemId,
  		"qty" : qty
  	}
  
  	return this.http.post(`${baseUrl}/cart/updateCartItem`,cartItemInfo,{responseType:'text'});
  }

  removeCartItem(id: number) {

  	return this.http.post(`${baseUrl}/cart/removeItem`,id,{responseType:'text'});
  }

}
