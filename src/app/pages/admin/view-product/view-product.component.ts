import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { RemoveProductService } from 'src/app/services/remove-product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
selectedProduct:Product;

 public checked: any;
 productList;
 allChecked:any;
removeProductList:Product[]=new Array();

  constructor(private removeProductService:RemoveProductService,public dialog:MatDialog,private viewProduct:ProductService,private router:Router) { }
 
  onSelect(product:Product) {
    this.selectedProduct=product;
    this.router.navigate(['/admin/viewProduct',this.selectedProduct.id])
  }

 
  openDialog(product:Product) {
    
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(
      result => {  {responseType: 'text'}
        console.log(result);
        if(result=="yes") {
          this.removeProductService.sendProduct(product.id).subscribe(
  
            
            (res:any) => {

              console.log(res);
              this.getProductList();
            }, 
            err => {
              console.log(product.id);
              console.log(err);
              this.getProductList();
            }
            );
        }
      }
      );
  }


  removeSelectedProducts() {
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if(result=="yes") {
          for (let product of this.removeProductList) {
            this.removeProductService.sendProduct(product.id).subscribe(
              res => {
// console.log(res);

              }, 
              err => {
                console.log(err);
                
              }
              );
          }
          location.reload();
        }
      }
      ); 
  }


  

  updateSelected(event){
    if(event.target.checked) {
      this.allChecked = true;
      this.removeProductList=this.productList.slice();
    } else {
      this.allChecked=false;
      this.removeProductList=[];
    }
  }
  updateRemoveProductList(event, product:Product) {
    if(event.target.checked) {
      this.removeProductList.push(product);
    } else {
      this.removeProductList.splice(this.removeProductList.indexOf(product), 1);
    }
   
  }
  

getProductList(){
  this.viewProduct.getProduct().subscribe(
    res=>{
    // console.log(res);
    this.productList=res;
    
    },
    (error)=>{
    console.log(error);
    }
    
    )
    
}

  ngOnInit(): void {
this.getProductList();
  }
}
  @Component({
    selector: 'dialog-result-example-dialog',
    templateUrl: './dialog-result-example-dialog.html'
  })
  export class DialogResultExampleDialog {
    constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>) {}
  
}
// Swal.fire({
//   icon:'info',
//   showCancelButton:true,
//   confirmButtonText:'Delete',
//   title:'Are you sure , Want to delete this Question ?'
// }).then((result)=>{
//   if(result.isConfirmed){
//     this._question.deleteQuestion(qid).subscribe((data)=>{
// this._snack.open('Question Deleted Successfully','',{
//   duration:3000,
// });
// this.questions=this.questions.filter((q:any)=>q.quesId!=qid)
//     },
    
//     (error)=>{
//       this._snack.open("Error While Deleting",'',{
//         duration:3000,
//       });
//       console.log(error)
//     })