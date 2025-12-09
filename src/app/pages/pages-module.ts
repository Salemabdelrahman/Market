// Angular Material
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from '../shared/shared-module';
import { AllProducts } from './user/all-products/all-products';
import { Cart } from './user/cart/cart';
import { ProductDetails } from './product-details/product-details';
import { AdminProducts } from './admin/admin-products/admin-products';
import { AdminCart } from './admin/admin-cart/admin-cart';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NotFound } from './not-found/not-found';






@NgModule({
  declarations: [
    AllProducts,
    ProductDetails,
    Cart,
    NotFound,
    AdminCart,
    AdminProducts,
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule, FontAwesomeModule, TranslateModule],
})
export class PagesModule { }
