import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  private sub: Subscription | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // subscribe للـ BehaviorSubject عشان التحديثات تظهر live
    this.sub = this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotal();
    });
  }

  // Remove Item
  removeItem(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  // Clear Cart
  clearCart() {
    this.cartService.clearCart();
  }

  // Increase/Decrease Quantity
  increment(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decrement(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  // Cleanup subscription
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
