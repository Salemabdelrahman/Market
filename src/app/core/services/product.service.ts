import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product as ProductModel } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class Product {

  // private baseUrlLocal = '/api/products'; // ملاحظة: يستخدم proxy.conf.json

  // private baseUrlLocal = 'http://localhost:3000/'; // Local Backend
  private baseUrl = 'https://fakestoreapi.com/'; // Local Backend



  constructor(private http: HttpClient) { }

  private loadAdminProducts(): ProductModel[] {
    const data = localStorage.getItem('admin_products');
    return data ? JSON.parse(data) : [];
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductModel[]>(`${this.baseUrl}products`).pipe(
      map(apiProducts => {
        const adminProducts = this.loadAdminProducts();
        return [...adminProducts, ...apiProducts] as any as Product[];
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    const adminProducts = this.loadAdminProducts();
    const adminProduct = adminProducts.find(p => Number(p.id) === Number(id));

    if (adminProduct) {
      return of(adminProduct as any as Product);
    }

    return this.http.get<Product>(`${this.baseUrl}products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}products`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}products/${id}`);
  }

  getCategories() :Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}products/categories`);
  }

  getProductsByCategory(cat: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}products?category=${encodeURIComponent(cat)}`);
  }

}
