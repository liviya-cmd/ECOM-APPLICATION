import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';  
import { Observable } from 'rxjs';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  // Get all products from Firebase (this will provide real-time updates)
  getProducts(): Observable<Product[]> {
    return this.db.list<Product>('products').valueChanges();
  }

  // Add a product to Firebase
  addProduct(product: Product): void {
    this.db.list('products').push(product);
  }

  // Update a product in Firebase
  updateProduct(product: Product): void {
    if (product.id != null) { // Ensure id is valid
      this.db.list('products').update(product.id.toString(), { ...product });
    } else {
      console.error('Product id is null or undefined');
    }
  }

  // Delete a product from Firebase
  deleteProduct(id: number): void {
    if (id != null) { // Ensure id is valid
      this.db.list('products').remove(id.toString());
    } else {
      console.error('Product id is null or undefined');
    }
  }
}
