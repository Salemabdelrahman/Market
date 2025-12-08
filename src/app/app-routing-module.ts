import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProducts } from './pages/user/all-products/all-products';
import { Cart } from './pages/user/cart/cart';
import { NotFound } from './pages/not-found/not-found';
import { ProductDetails } from './pages/product-details/product-details';
import { AuthGuard } from './core/guards/auth.guard';
import { Login } from './layout/login/login';
import { AdminCart } from './pages/admin/admin-cart/admin-cart';
import { AdminProducts } from './pages/admin/admin-products/admin-products';
import { UserLayout } from './layout/user-layout/user-layout';
import { AdminLayout } from './layout/admin-layout/admin-layout';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  // USER LAYOUT
  {
    path: '',
    component: UserLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: AllProducts },
      { path: 'products/:id', component: ProductDetails },
      { path: 'cart', component: Cart },
    ]
  },

  // ADMIN LAYOUT
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      { path: 'cart', component: AdminCart },      // ✅ /admin/cart
      { path: 'products', component: AdminProducts }, // ✅ /admin/products
    ]
  },

  { path: '**', component: NotFound }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
