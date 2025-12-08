import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { count } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-header',
  standalone: false,
  templateUrl: './user-header.html',
  styleUrls: ['./user-header.scss']
})

export class UserHeader {

  // cart item count
  cartItemCount: number = 0;

  constructor(private cartService: CartService, public auth: AuthService) { }


  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      // update cart item count
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });

  }

  logout() {
    this.auth.logout();
  }

}
