import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://fakestoreapi.com/carts';
  private cartSubject = new BehaviorSubject<any[]>([]); // using BehaviorSubject for reactive updates
  private storageKey = 'cart_items';

  // BehaviorSubject to enable live updates
  private cartItems = new BehaviorSubject<CartItem[]>(this.loadFromLocalStorage());
  cart$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) { }

  // -----------------------------
  //       LOCAL STORAGE
  // -----------------------------
  private loadFromLocalStorage(): CartItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToLocalStorage(items: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // -----------------------------
  //       CART METHODS
  // -----------------------------


  // local storage methods above
  getCart(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // ---------------------------------------------

  addToCart(item: CartItem) {
    let items = this.cartItems.value;

    // Check if product exists
    const existing = items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity += item.quantity; // add to quantity
    } else {
      items.push(item);
    }

    this.cartItems.next(items);
    this.saveToLocalStorage(items); // Save to LS
  }

  removeItem(id: number) {
    let items = this.cartItems.value.filter(i => i.id !== id);

    this.cartItems.next(items);
    this.saveToLocalStorage(items);
  }

  updateQuantity(id: number, quantity: number) {
    let items = this.cartItems.value;

    const target = items.find(i => i.id === id);
    if (target) {
      target.quantity = quantity;
    }

    this.cartItems.next(items);
    this.saveToLocalStorage(items);
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveToLocalStorage([]);
  }

  // Get total price
  getTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
