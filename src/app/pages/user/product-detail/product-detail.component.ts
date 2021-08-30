import { Product } from './../../admin/models/product';
import { GetProductService } from './../../../services/get-product.service';
import { ProductService } from './../../../services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
 productId: number;
 product: Product = new Product();

 numberList: number[] = [1,2,3,4,5,6,7,8,9];
 qty: number;

addProductSuccess: boolean = false;
 notEnoughStock:boolean = false;
 login:boolean=false;



  constructor(private route:ActivatedRoute,private router:Router,private getProductService:GetProductService
    ,private productService:ProductService,private cartService:CartService) { }





    onAddToCart() {
      this.cartService.addItem(this.productId, this.qty).subscribe(
        res => {
          console.log(res);
          this.addProductSuccess=true;
        },
        err => {
          console.log(err);
          this.notEnoughStock=true;
          this.login=true;
        }
      );
    }



  ngOnInit(): void {
    this.route.params.forEach((params:Params)=>{
this.productId=Number.parseInt(params['id']);
    });

    this.getProductService.getProduct(this.productId).subscribe(
      (res:any)=>{
this.product=res;
      },
      error=>{
        console.log(error);
        
      }
    )
    this.qty=1;
  }

}
