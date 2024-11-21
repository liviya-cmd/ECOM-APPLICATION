import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; 
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];  
  newProduct: Product = {
    id: '', name: '', description: '', price: 0,
    imageUrl: ''  
  };  
  isEditMode: boolean = false;  
  editingProductId: string | null = null;  
  isFormVisible: boolean = false;  
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();  
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addOrUpdateProduct(): void {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.price) {
      if (this.isEditMode && this.editingProductId) {
        this.newProduct.id = this.editingProductId!;
        this.productService.updateProduct(this.newProduct).then(() => {
          this.resetForm();
          this.loadProducts();  
        }).catch(error => console.error("Error updating product: ", error));
      } else {
       
        this.productService.addProduct(this.newProduct).then(() => {
          this.resetForm();
          this.loadProducts();  
        }).catch(error => console.error("Error adding product: ", error));
      }
    }
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.editingProductId = product.id;
    this.newProduct = { ...product };  
    this.toggleForm();  
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).then(() => {
      this.loadProducts();  
    }).catch(error => console.error("Error deleting product: ", error));
  }

  resetForm(): void {
    this.newProduct = { id: '', name: '', description: '', price: 0, imageUrl: '' };  
    this.isEditMode = false;
    this.editingProductId = null;
    this.toggleForm();  
  }
}
