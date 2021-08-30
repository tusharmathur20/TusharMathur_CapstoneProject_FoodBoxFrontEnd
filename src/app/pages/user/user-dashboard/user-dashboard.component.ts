import { CartItem } from './../models/cart-item';
import { OrderService } from './../../../services/order.service';
import { Order } from './../models/order';
import { ShippingService } from './../../../services/shipping.service';
import { UserShipping } from './../models/user-shipping';
import { UserBilling } from './../models/user-billing';
import { UserPayment } from './../models/user-payment';
import { UserService } from './../../../services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation} from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDashboardComponent implements OnInit {

  user:any=null;
   selectedProfileTab: number = 0;
	 selectedBillingTab: number = 0;
    dataFetched = false;
	 selectedShippingTab : number =0;

	 userPayment: UserPayment = new UserPayment();
	 userBilling: UserBilling = new UserBilling();
	 userPaymentList: UserPayment[] =[];
	 defaultPaymentSet:boolean;
	 defaultUserPaymentId: number;
   cartItemList:CartItem[]
	

 userShipping: UserShipping = new UserShipping();
userShippingList: UserShipping[] = [];

	 defaultUserShippingId: number;
	 defaultShippingSet: boolean;

    orderList: Order[] = [];
    order:Order = new Order();
    displayOrderDetail:boolean;

  constructor(private shippingService:ShippingService,private logIn:LoginService,private userService:UserService,
     private orderService: OrderService,private paymentService:PaymentService) { }


    selectedShippingChange(val: number) {
      this.selectedShippingTab = val;
    }
  
    selectedBillingChange(val: number) {
      this.selectedBillingTab = val;
    }
  

  getCurrentUser(){
    this.user=this.logIn.getUser();
    this.logIn.getCurrentUser().subscribe(data=>{
   
      this.user=data;

      this.userPaymentList = this.user.userPaymentList;
      this.userShippingList = this.user.userShippingList;
      // console.log(this.userPaymentList);
      

      for (let index in this.userPaymentList) {
        if(this.userPaymentList[index].defaultPayment) {
          this.defaultUserPaymentId=this.userPaymentList[index].id;
          break;
        }
      }
      for (let index in this.userShippingList) {
        if(this.userShippingList[index].userShippingDefault) {
          this.defaultUserShippingId=this.userShippingList[index].id;
          break;
        }
      }

      this.dataFetched = true;
  },
  (error)=>{
    console.log(error);
    
  }
  )
  }

 


  onNewPayment() {
  	this.paymentService.newPayment(this.userPayment).subscribe(
  		res => {
  			this.getCurrentUser();
  			this.selectedBillingTab = 0;
        this.userPayment=new UserPayment();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }


  onUpdatePayment (payment: UserPayment) {
  	this.userPayment = payment;
  	this.userBilling = payment.userBilling;
  	this.selectedBillingTab = 1;
  }

  onRemovePayment(id:number) {
  	this.paymentService.removePayment(id).subscribe(
  		res => {
  			this.getCurrentUser();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  setDefaultPayment() {
  	this.defaultPaymentSet = false;
  	this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
  		res => {
  			this.getCurrentUser();
  			this.defaultPaymentSet = true;
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }



  onNewShipping() {
  	this.shippingService.newShipping(this.userShipping).subscribe(
  		res => {
  			this.getCurrentUser();
  			this.selectedShippingTab=0;
        this.userShipping = new UserShipping();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  onUpdateShipping(shipping: UserShipping) {
  	this.userShipping = shipping;
  	this.selectedShippingTab = 1;
  }

  onRemoveShipping(id: number) {
  	this.shippingService.removeShipping(id).subscribe(
  		res => {
  			this.getCurrentUser();
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  setDefaultShipping() {
  	this.defaultShippingSet = false;
  	this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
  		res => {
  			this.getCurrentUser();
  			this.defaultShippingSet = true;
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }
  onDisplayOrder(order: Order) {
    // console.log(order);
    this.order=order;
    this.cartItemList = this.order.cartItemList;
 ;
 
    this.displayOrderDetail=true;
  }

  
  ngOnInit(): void {
 
    this.getCurrentUser();
 
    this.orderService.getOrderList().subscribe(
      (res:any) => {
        this.orderList = res;
        

    
       },
       error => {
         console.log(error);
       }
     );

    this.userBilling.userBillingCity="";
     this.userPayment.type="";
     this.userPayment.expiryMonth="";
     this.userPayment.expiryYear="";
     this.userPayment.userBilling = this.userBilling;
     this.defaultPaymentSet = false;
 
     this.userShipping.userShippingCity="";
     this.defaultShippingSet=false;
   }
 
 
}
