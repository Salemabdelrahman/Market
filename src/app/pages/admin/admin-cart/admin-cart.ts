import { Component, OnInit } from '@angular/core';
import { AdminCartService } from '../../../core/services/admin-cart-service';
import { Product } from '../../../core/models/product.model';


interface GroupedMonth {
  monthKey: string;
  display: string;
  quantity: number;
  items: Product[];
}

@Component({
  selector: 'app-admin-cart',
  standalone: false,
  templateUrl: './admin-cart.html',
  styleUrls: ['./admin-cart.scss']
})
export class AdminCart implements OnInit {

  products: Product[] = [];
  grouped: GroupedMonth[] = [];

  startDate: string = '';
  endDate: string = '';

  selectedMonthItems: Product[] = [];

  constructor(private adminCartService: AdminCartService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.adminCartService.getAllProducts().subscribe(data => {
      this.products = data;
      this.groupProducts();
    });
  }

  groupProducts() {
    const map = new Map<string, Product[]>();

    this.products.forEach(p => {
      const key = this.adminCartService.formatMonth(p.createdAt);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    });

    this.grouped = [];

    map.forEach((items, key) => {
      const d = new Date(items[0].createdAt);
      const display = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });

      this.grouped.push({
        monthKey: key,
        display,
        quantity: items.length,
        items
      });
    });
  }

  // Apply Date Filter
  applyFilter() {
    if (!this.startDate || !this.endDate) return;

    const filtered = this.adminCartService.filterByDate(
      this.startDate,
      this.endDate,
      this.products
    );

    this.products = filtered;
    this.groupProducts();
  }

  // Delete all products for a month
  deleteMonth(key: string) {
    this.adminCartService.deleteByMonth(key).then(() => {
      this.loadProducts();
    });
  }

  // Set items for modal
  openModal(items: Product[]) {
    this.selectedMonthItems = items;
  }
}
