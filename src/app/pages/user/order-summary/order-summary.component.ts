import { Product } from './../../admin/models/product';
import { CartItem } from './../models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from './../../../services/checkout.service';
import { Order } from './../models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

	 order:Order = new Order();
	 estimatedDeliveryTime: string;
 cartItemList: CartItem[] =[]
   product:Product[]=[]

  constructor(
  	private checkoutService: CheckoutService, private route: ActivatedRoute,
  	 private router: Router
  	) { }

  ngOnInit() {


    
	this.route.queryParams.subscribe(params => {
		this.order = JSON.parse(params['order']);


    

  		this.cartItemList = this.order.cartItemList;
		//   console.log(this.cartItemList);
  	});
  }
}
