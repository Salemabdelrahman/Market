import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {


  product: any = null;
  loading = false;

  constructor(private route: ActivatedRoute, private productService: Product, private cartService: CartService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getProductById(+id);
  }

  getProductById(id: number) {
    this.loading = true;
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res;
      this.loading = false;
    });
  }

  // add to cart method
  addToCart() {
    this.cartService.addToCart({
      id: this.product.id,
      title: this.product.title,
      price: this.product.price,
      image: this.product.image,
      quantity: 1


    });

  }

}
