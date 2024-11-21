import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

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

  deleteProduct(id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).delete();
  }
}
