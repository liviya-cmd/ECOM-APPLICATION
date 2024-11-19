import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0
  };

  nextId: number = 1;
  isEditMode: boolean = false; 
  editingProductId: number | null = null; 

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
      this.nextId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    }
  }

  addOrUpdateProduct(): void {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.price) {
      if (this.isEditMode) {
        const index = this.products.findIndex(p => p.id === this.newProduct.id);
        if (index !== -1) {
          this.products[index] = { ...this.newProduct };
        }
      } else {
        this.products.push({ ...this.newProduct, id: this.nextId });
        this.nextId++;
      }

      this.saveProducts();

      this.resetForm();
    }
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.editingProductId = product.id;
    this.newProduct = { ...product }; 
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts();
  }

  saveProducts(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  resetForm(): void {
    this.newProduct = { id: 0, name: '', description: '', price: 0 };
    this.isEditMode = false;
    this.editingProductId = null;
  }
}
