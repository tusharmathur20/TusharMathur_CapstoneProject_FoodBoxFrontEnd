import { Product } from './../../admin/models/product';
import { ProductService } from './../../../services/product.service';
import { GetProductService } from './../../../services/get-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  
})
export class ProductListComponent implements OnInit {
  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

	 selectedProduct: Product;
	productList: Product[]=[];
  name:any;
  searchedKeyword: string;
	

  constructor(private route:ActivatedRoute,private router:Router,private getProductService:GetProductService
    ,private productService:ProductService
    ) { }
    onSelect(product:Product) {
      this.selectedProduct = product;
      this.router.navigate(['/productDetail', this.selectedProduct.id]);
    }
  
    ngOnInit() {

      this.route.queryParams.subscribe(params => {
        if(params['productList']) {
          console.log("filtered Product list");
          this.productList = JSON.parse(params['productList']);
        } else {
          this.productService.getProduct().subscribe(
            (res:any) => {
              // console.log(res);
              this.productList = res;
            },
            err => {
              console.log(err);
            }
            );
        }
      });
  


    }
    onTableDataChange(event){
      this.page = event;
      this.ngOnInit();
    }  
  
    onTableSizeChange(event): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.ngOnInit();
    }  
  }
  
  