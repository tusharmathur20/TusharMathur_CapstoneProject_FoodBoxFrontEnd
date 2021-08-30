import { Payment } from './../models/payment';
import { BillingAddress } from './../models/billing-address';
import { ShippingAddress } from './../models/shipping-address';
import { CheckoutService } from './../../../services/checkout.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ShippingService } from './../../../services/shipping.service';
import { CartService } from 'src/app/services/cart.service';
import { NavigationExtras, Router } from '@angular/router';
import { Order } from './../models/order';
import { UserBilling } from './../models/user-billing';
import { UserShipping } from './../models/user-shipping';
import { UserPayment } from './../models/user-payment';
import { ShoppingCart } from './../models/shopping-cart';
import { CartItem } from './../models/cart-item';
import { Product } from './../../admin/models/product';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
   selectedProduct: Product;
   cartItemList: CartItem[] = [];
   cartItemNumber: number;
   shoppingCart: ShoppingCart = new ShoppingCart();
   cartItemUpdated:boolean;
   shippingAddress:ShippingAddress=new ShippingAddress();
   billingAddress:BillingAddress = new BillingAddress();
   userPayment:UserPayment = new UserPayment();
   userShipping:UserShipping = new UserShipping();
   userBilling: UserBilling = new UserBilling();
   userShippingList: UserShipping[] = [];
   userPaymentList: UserPayment[] = [];
   payment: Payment = new Payment();
   selectedTab: number;
   emptyShippingList: boolean = true;
   emptyPaymentList: boolean = true;
   stateList: string[] = [];
   shippingMethod:string;
   order:Order = new Order();


  constructor(private router:Router, 
  	private cartService: CartService, 
  	private shippingService: ShippingService,
  	private paymentService: PaymentService,
  	private checkoutService: CheckoutService) { }



    onSelect(product:Product) {
      this.selectedProduct = product;
      this.router.navigate(['/productDetail', this.selectedProduct.id]);
    }
  
    selectedChange(val :number ){
      this.selectedTab=val;
    }
  
    goToPayment() {
      this.selectedTab=1;
    }
  
    goToReview() {
      this.selectedTab=2;
    }
  
    getCartItemList(){
      this.cartService.getCartItemList().subscribe(
        (res:any)=>{
          this.cartItemList = res;
          this.cartItemNumber = this.cartItemList.length;
        },
        error=>{
          console.log(error);
        }
        );
    }
  
    setShippingAddress(userShipping: UserShipping) {
      this.shippingAddress.shippingAddressName = userShipping.userShippingName;
      this.shippingAddress.shippingAddressStreet1 = userShipping.userShippingStreet1;
      this.shippingAddress.shippingAddressStreet2 = userShipping.userShippingStreet2;
      this.shippingAddress.shippingAddressCity = userShipping.userShippingCity;
     
      this.shippingAddress.shippingAddressZipcode = userShipping.userShippingZipcode;
    }
  
    setPaymentMethod(userPayment: UserPayment) {
      this.payment.type = userPayment.type;
      this.payment.cardNumber = userPayment.cardNumber;
      this.payment.expiryMonth = userPayment.expiryMonth;
      this.payment.expiryYear = userPayment.expiryYear;
      this.payment.cvc = userPayment.cvc;
      this.payment.holderName = userPayment.holderName;
      this.payment.defaultPayment = userPayment.defaultPayment;
      this.billingAddress.billingAddressName = userPayment.userBilling.userBillingName;
      this.billingAddress.billingAddressStreet1 = userPayment.userBilling.userBillingStreet1;
      this.billingAddress.billingAddressStreet2 = userPayment.userBilling.userBillingStreet2;
      this.billingAddress.billingAddressCity = userPayment.userBilling.userBillingCity;
     
      this.billingAddress.billingAddressZipcode = userPayment.userBilling.userBillingZipcode;
    }
  
    setBillingAsShipping(event){
      console.log("same as shipping")
  
      if(event.target.checked) {
        this.billingAddress.billingAddressName = this.shippingAddress.shippingAddressName;
        this.billingAddress.billingAddressStreet1 = this.shippingAddress.shippingAddressStreet1;
        this.billingAddress.billingAddressStreet2 = this.shippingAddress.shippingAddressStreet2;
        this.billingAddress.billingAddressCity = this.shippingAddress.shippingAddressCity;
  
        this.billingAddress.billingAddressZipcode = this.shippingAddress.shippingAddressZipcode;
      } else {
        this.billingAddress.billingAddressName = "";
        this.billingAddress.billingAddressStreet1 = "";
        this.billingAddress.billingAddressStreet2 = "";
        this.billingAddress.billingAddressCity = "";

        this.billingAddress.billingAddressZipcode = "";
      }
    }
  
    onSubmit(){
      this.checkoutService.checkout(
        this.shippingAddress,
        this.billingAddress,
        this.payment,
        this.shippingMethod
        ).subscribe(
        (res:any)=>{
          this.order=res;
          // console.log(this.order);
  
          let navigationExtras: NavigationExtras = {
              queryParams: {
                  "order": this.order
              }
             
          };
          // console.log(this.order)
          this.router.navigate(['/user-profile/orderSummary'], navigationExtras);
        },
        error=>{
          console.log(error);
        }
        );
      }



  ngOnInit(): void {
    this.getCartItemList();


    this.cartService.getShoppingCart().subscribe(
      (res:any)=>{
        console.log(res);
        this.shoppingCart=res;
      },
      error=>{
        console.log(error);
      }
      );

    this.shippingService.getUserShippingList().subscribe(
      (res:any)=>{
        console.log(res);
        this.userShippingList=res;
        if(this.userShippingList.length) {
          this.emptyShippingList = false;

          for (let userShipping of this.userShippingList) {
            if(userShipping.userShippingDefault) {
              this.setShippingAddress(userShipping);
              return;
            }
          }
        }
      },
      error=>{
        console.log(error);
      }
      );

    this.paymentService.getUserPaymentList().subscribe(
      (res:any)=>{
        console.log(res);
        this.userPaymentList=res;
        this.emptyPaymentList = false;

        if(this.userPaymentList.length) {
          this.emptyPaymentList = false;

          for (let userPayment of this.userPaymentList) {
            if(userPayment.defaultPayment) {
              this.setPaymentMethod(userPayment);
              return;
            }
          }
        }
      },
      error=>{
        console.log(error);
      }
      );

  

    this.payment.type="";
    this.payment.expiryMonth="";
    this.payment.expiryYear="";

    this.shippingMethod="groundShipping";
  }



}