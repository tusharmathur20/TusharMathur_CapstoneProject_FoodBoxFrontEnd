import { HttpClient } from '@angular/common/http';
import { UploadImageService } from './../../../services/upload-image.service';

import { AddProductService } from './../../../services/add-product.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import baseUrl from 'src/app/services/helper';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

newProduct:Product=new Product();
public productAdded :boolean;
selectedFile:File=null;
  constructor(private addproduct:AddProductService,public uploadImge:UploadImageService,private http:HttpClient) { }

  ngOnInit(): void {
  
    this.productAdded=false;
    this.newProduct.active=true;
    this.newProduct.category="Indian"
  }

onFileSelected(event){
  this.selectedFile=event.target.files[0];
}

  onSubmit(){



this.addproduct.sendProduct(this.newProduct).subscribe(
  (data:any)=>{
    const fd=new FormData();
    fd.append('productImage',this.selectedFile,this.selectedFile.name)
this.http.post(`${baseUrl}/product/add/image?id=`+data.id,fd,{responseType:'text'}).subscribe(
  res=>{
    Swal.fire('Success','Successfully Added  , User Id:  '+data.id,'success');
  }
)
   
this.productAdded=true;
this.newProduct=new Product
this.productAdded=false;
this.newProduct.active=true;
this.newProduct.category="Indian"

  },
  (error)=>{
console.log(error);

  }
)
  }
}
