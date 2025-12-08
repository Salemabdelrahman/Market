import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {

  categories: string[] = [];
  selectedCategory: string = '';

  @Output() categoryChange = new EventEmitter<string>();

  constructor(private productService: Product) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productService.getCategories().subscribe({
      next: (res: string[]) => this.categories = res || [],
      error: (err) => {
        console.error('Failed to load categories', err);
        // ممكن تعرض رسالة للـ user أو تترك قائمة فارغة
      }
    });
  }

  changeCategory(cat: string) {
    this.selectedCategory = cat;
    this.categoryChange.emit(cat);
  }
}
