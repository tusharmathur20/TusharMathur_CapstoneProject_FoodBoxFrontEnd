import { Router } from '@angular/router';
import { ShoppingCart } from './../models/shopping-cart';
import { CartItem } from './../models/cart-item';
import { Product } from './../../admin/models/product';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

selectedProduct: Product;
 cartItemList: CartItem[] = [];
cartItemNumber: number;
 shoppingCart: ShoppingCart = new ShoppingCart();
	 cartItemUpdated: boolean;
 emptyCart: boolean;
 notEnoughStock: boolean;

  constructor(private cartService:CartService,private router:Router) { }

  onSelect(product:Product) {
  	this.selectedProduct = product;
  	this.router.navigate(['/productDetail', this.selectedProduct.id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
  	this.cartService.removeCartItem(cartItem.id).subscribe(
  		res => {
  			console.log(res);
  			this.getCartItemList();
  			this.getShoppingCart();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  onUpdateCartItem(cartItem: CartItem) {
  	this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
  		res => {
  			console.log(res);
  			this.cartItemUpdated=true;
  			this.getShoppingCart();
  		},
  		error => {
  			console.log(error);
  		}
  	)
  }

  getCartItemList()  {
  	this.cartService.getCartItemList().subscribe(
  		(res:any) => {
  			this.cartItemList=res;
  			this.cartItemNumber = this.cartItemList.length;
  		},
  		error => {
  			console.log(error);
  		}
  	)
  }

  getShoppingCart() {
  	this.cartService.getShoppingCart().subscribe(
  		(res:any) => {
  			// console.log(res);
  			this.shoppingCart=res;
  		},
  		error => {
  			console.log(error);
  		}
  	)
  }

  onCheckout() {
  	if(this.cartItemNumber==0) {
  		this.emptyCart=true;
  	} else {
  		for (let item of this.cartItemList) {
  			if (item.qty > item.product.inStock) {
  				console.log("not enough stock on some item");
  				this.notEnoughStock=true;
  				return;
  			}
  		}

			// this.router.navigate('[/order]');
  	}
  }


  ngOnInit(): void {
    this.getCartItemList();
  	this.getShoppingCart();
  }

}
