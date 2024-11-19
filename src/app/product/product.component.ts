import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Subscribe to Firebase updates to keep products in sync
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      // After loading products, set the nextId
      this.nextId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    });
  }

  addOrUpdateProduct(): void {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.price) {
      if (this.isEditMode) {
        // If in edit mode, update the product in Firebase
        this.productService.updateProduct(this.newProduct);
      } else {
        // If not in edit mode, add the product to Firebase
        const productToAdd = { ...this.newProduct, id: this.nextId };
        this.productService.addProduct(productToAdd);
        this.nextId++;  // Increment nextId for the next product
      }

      this.resetForm(); // Reset the form after adding/updating
    }
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.editingProductId = product.id;
    this.newProduct = { ...product };  // Set form to current product values
  }

  deleteProduct(id: number): void {
    // Delete the product in Firebase and the UI will automatically update
    this.productService.deleteProduct(id);
  }

  resetForm(): void {
    this.newProduct = { id: 0, name: '', description: '', price: 0 };
    this.isEditMode = false;
    this.editingProductId = null;
  }
}
