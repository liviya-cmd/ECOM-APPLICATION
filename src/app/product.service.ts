import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  
  offerprice: string;
  uploadimg: string;
  category:string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').valueChanges();
  }

  addProduct(product: Product): Promise<void> {
    const id = this.firestore.createId();
    product.id = id;
    return this.firestore.collection('products').doc(id).set(product);
  }

  updateProduct(product: Product): Promise<void> {
    return this.firestore.collection('products').doc(product.id).update(product);
  }

  deleteProduct(id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).delete();
  }
}
