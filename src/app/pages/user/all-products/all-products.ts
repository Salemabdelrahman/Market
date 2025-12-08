import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-all-products',
  standalone: false,
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss'
})
export class AllProducts implements OnInit {

  // data
  products: any[] = [];           // filtered / current working list
  originalProducts: any[] = [];   // full list from API
  paginatedProducts: any[] = [];

  // pagination
  currentPage = 1;
  pageSize = 8;
  totalPages = 0;
  totalProducts = 0;

  loading = false;

  constructor(private productService: Product) { }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res: any[]) => {
        this.originalProducts = res || [];
        this.products = [...this.originalProducts];
        this.totalProducts = this.products.length;
        this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
        this.currentPage = 1;
        this.updatePaginatedProducts();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.loading = false;
      }
    });
  }

  updatePaginatedProducts(): void {
    // Recalculate total products and pages
    this.totalProducts = this.products.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalProducts / this.pageSize)); // Ensure at least 1 page

    // Get products for current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  addToCart(product: any): void {
    console.log('Product added to cart:', product);
  }

  // Filter products by category
  filterByCategory(category: string) {
    // If no category or 'All', restore original products synchronously
    if (!category || category === 'All') {
      this.products = [...this.originalProducts];
      this.currentPage = 1;
      this.updatePaginatedProducts();
      this.loading = false;
      return;
    }

    // Local filter by category (no extra API calls)
    this.products = this.originalProducts.filter(p =>
      (p.category || '').toLowerCase() === category.toLowerCase()
    );
    this.currentPage = 1;
    this.updatePaginatedProducts();
    this.loading = false;
  }
}
