import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../core/models/product.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCartService {

  private api = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  // GET all products
  getAllProducts() {
    return this.http.get<Product[]>(this.api);
  }

  // Delete all products for a specific month
  async deleteByMonth(monthKey: string) {
    const products = await firstValueFrom(this.http.get<Product[]>(this.api));

    const itemsToDelete = products.filter(
      p => this.formatMonth(p.createdAt) === monthKey
    );

    const calls = itemsToDelete.map(p =>
      firstValueFrom(this.http.delete(`${this.api}/${p.id}`))
    );

    return Promise.all(calls);
  }

  // Format month: "2025-03"
  formatMonth(dateString: string) {
    const d = new Date(dateString);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  // Filter by date
  filterByDate(start: string, end: string, products: Product[]) {
    const s = new Date(start);
    const e = new Date(end);

    return products.filter(p => {
      const d = new Date(p.createdAt);
      return d >= s && d <= e;
    });
  }
}
