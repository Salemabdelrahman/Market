import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.html',
  styleUrls: ['./admin-header.scss']
})

export class AdminHeader implements OnInit {

  // cart item count
  cartItemCount: number = 0;
  role: string | null = null;


  constructor(private cartService: CartService, public auth: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      // update cart item count
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

      // get user role
      this.role = this.auth.getUserRole();
    });

  }

  logout() {
    this.auth.logout();



  }

}
