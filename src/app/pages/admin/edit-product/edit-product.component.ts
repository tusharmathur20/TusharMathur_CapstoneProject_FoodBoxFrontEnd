import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product';
import { GetProductService } from './../../../services/get-product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UploadImageService } from 'src/app/services/upload-image.service';

import { EditBookService } from 'src/app/services/edit-book.service';
import Swal from 'sweetalert2';
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
productId:number;
product:Product=new Product();
productUpdated:boolean;
selectedFile:File=null;
  constructor(private uploadImage:UploadImageService,private route:ActivatedRoute,
    private getproduct:GetProductService ,private router:Router,private editBook:EditBookService,
    private http:HttpClient,private snack:MatSnackBar) { }


    onFileSelected(event){
      this.selectedFile=event.target.files[0];
    }
onSubmit(){
  this.editBook.sendProduct(this.product).subscribe(
    (data:any)=>{
     
      const fd=new FormData();
      fd.append('productImage',this.selectedFile,this.selectedFile.name)
     
  this.http.post(`${baseUrl}/product/update/image?id=`+data.id,fd,{responseType:'text'}).subscribe(
    res=>{
     
  
  this.productUpdated=true;
  },
  (error)=>{
    this.snack.open("Image not added",'',{
      duration:3000,
    });

    
    console.log(error);
    
  }
  )


  Swal.fire('Success','Successfully Added  , User Id:  '+data.id,'success');
  

  },
  (error)=>{
    console.log(error);
    
  }
  
  
  
  )
  
}
  ngOnInit(): void {
    this.route.params.forEach((params:Params)=>{
      this.productId=Number.parseInt(params['id']);
    })
    this.getproduct.getProduct(this.productId).subscribe(
      (res:any)=>{
this.product=res;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

}
