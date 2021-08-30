import { OrderSummaryComponent } from './pages/user/order-summary/order-summary.component';
import { OrderComponent } from './pages/user/order/order.component';
import { ShoppingCartComponent } from './pages/user/shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import { ProductListComponent } from './pages/user/product-list/product-list.component';
import { MyProfileComponent } from './pages/user/my-profile/my-profile.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { SingleProductComponent } from './pages/admin/single-product/single-product.component';
import { ViewProductComponent } from './pages/admin/view-product/view-product.component';
import { AddProductsComponent } from './pages/admin/add-products/add-products.component';



import { WelcomeComponentComponent } from './pages/admin/welcome-component/welcome-component.component';

import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  },
  {
path:'home',
component:HomeComponent
  },
  {
    path:'product-list',
component:ProductListComponent,
pathMatch:'full'
  },
  {
    path:'productDetail/:id',
component:ProductDetailComponent,
pathMatch:'full'
  },
 
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'admin',
    component:AdminDashboardComponent,
    // pathMatch:"full",
  canActivate:[AdminGuard],
  children:[
      {
        path:'',
        component:WelcomeComponentComponent
      },
      {
        path:'add-product',
        component:AddProductsComponent
      },
      {
        path:'product',
        component:ViewProductComponent
      },
      {
        path:'viewProduct/:id',
        component:SingleProductComponent
      },
      {
        path:'editProduct/:id',
        component:EditProductComponent
      },
     
  
    ]
  },
  {
    path:'user-profile',
    component:MyProfileComponent,
    // pathMatch:'full',
    canActivate:[UserGuard],
    children:[
      {
        path:'user-dashboard',
        component:UserDashboardComponent
      },
      {
        path:'shopping-cart',
        component:ShoppingCartComponent
      },
      {
        path:'check-out',
        component:OrderComponent
      },
      {
        path:'orderSummary',
        component:OrderSummaryComponent
      },
    ]
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
