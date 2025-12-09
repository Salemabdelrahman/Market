import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { AdminProductsService } from '../../../core/services/admin-product-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.scss']
})
export class AdminProducts implements OnInit {

  products: Product[] = [];
  categories: string[] = [];

  // Model object (for add/edit)
  formData: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    quantity: 1,
    createdAt: ''
  };

  isEdit = false;

  searchTerm: string = '';
  selectedCategory: string | null = null;

  constructor(private adminService: AdminProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.adminService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  // Open Add Modal
  openAddModal() {
    this.isEdit = false;

    this.formData = {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      quantity: 1,
      createdAt: new Date().toISOString()
    };
  }

  // Open Edit Modal
  openEditModal(p: Product) {
    this.isEdit = true;
    this.formData = { ...p };
  }

  // Save Product (Add or Edit)
  save() {
    if (!this.formData.title || !this.formData.price) {
      alert("Title and Price are required.");
      return;
    }
    if (this.isEdit) {
      this.adminService.update(this.formData.id, this.formData).subscribe(() => {
        this.loadProducts();
      });
    } else {

      this.formData.createdAt = new Date().toISOString();

      this.adminService.create(this.formData).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  // Delete Product
  deleteProduct(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    this.adminService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }

  // للـ Stats Cards
  getActiveProducts(): number {
    return this.products.length; // أو حسب منطقك
  }

  getCategories() {
    this.adminService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }


  // search filter
  get filteredProducts() {
    return this.products.filter(p =>
      p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // transform array to set for unique categories
  get groupedProducts() {
    const groups: Record<string, Product[]> = {};

    this.filteredProducts.forEach(p => {
      if (!groups[p.category]) {
        groups[p.category] = [];
      }
      groups[p.category].push(p);
    });

    return groups;
  }

  // View products by category
  viewProductsByCategory(category: string) {
    this.selectedCategory = category;
    this.searchTerm = category; // فلترة مباشرة
  }











}
