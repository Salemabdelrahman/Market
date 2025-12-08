import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {

  @Input() data: any;
  @Output() item = new EventEmitter<any>();
  // add quantity property
  quantity: number = 1;

  constructor(private router: Router, private cartService: CartService) { }


  // increment method
  increment() {
    this.quantity++;
  }
  // decrement method
  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  // add to cart method
  addToCart() {
    this.cartService.addToCart({
      id: this.data.id,
      title: this.data.title,
      price: this.data.price,
      image: this.data.image,
      quantity: this.quantity

    });
    this.quantity = 1; // reset quantity after adding to cart
    this.item.emit(this.data); // emit event to parent component
  }

  // Open product details
  openDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
