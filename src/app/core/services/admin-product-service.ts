import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../core/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  private api = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  create(product: Product) {
    return this.http.post(this.api, product);
  }

  update(id: number, product: Product) {
    return this.http.put(`${this.api}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  // Get All Categories
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/categories`);
  }
}
