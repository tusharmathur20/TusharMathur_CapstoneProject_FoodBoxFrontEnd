import { GetProductService } from './../../../services/get-product.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

 public product:Product=new Product();
productId:number

response;

constructor(private getproductService:GetProductService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.forEach((params:Params)=>{
      this.productId=Number.parseInt(params['id']);
    });
    this.getproductService.getProduct(this.productId).subscribe(
      (res:any)=>{
      this.product=res;
      
      
      
      },
      (error)=>{
        console.log();
        
      }
    )

  }
  onSelect(product:Product){
this.router.navigate(['/admin/editProduct',this.product.id])
// .then(s=>
//   location.reload())
}
  

}
