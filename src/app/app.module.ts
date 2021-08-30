import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WelcomeComponentComponent } from './pages/admin/welcome-component/welcome-component.component';
import { AddProductsComponent } from './pages/admin/add-products/add-products.component';
import { ViewProductComponent,DialogResultExampleDialog } from './pages/admin/view-product/view-product.component';
import { SingleProductComponent } from './pages/admin/single-product/single-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import {MatButtonModule} from '@angular/material/button';
import { UserNavbarComponent } from './pages/user/user-navbar/user-navbar.component';
import { MyProfileComponent } from './pages/user/my-profile/my-profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductListComponent } from './pages/user/product-list/product-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import { ShoppingCartComponent } from './pages/user/shopping-cart/shopping-cart.component';
import { OrderComponent } from './pages/user/order/order.component';
import { OrderSummaryComponent } from './pages/user/order-summary/order-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,

    WelcomeComponentComponent,
     AddProductsComponent,
     ViewProductComponent,
     SingleProductComponent,
     EditProductComponent,
     DialogResultExampleDialog,
     UserNavbarComponent,
     MyProfileComponent,
     ProductListComponent,
     ProductDetailComponent,
     ShoppingCartComponent,
     OrderComponent,
     OrderSummaryComponent,
     
     

  

  
  


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  



    
    
    

    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
