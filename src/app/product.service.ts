import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id; 
          return { ...data, id }; 
        })
      )
    );
  }

  addProduct(product: Product): Promise<void> {
    const id = this.firestore.createId();  
    return this.firestore.collection('products').doc(id).set({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      id: id  
    });
  }
  

  updateProduct(product: Product): Promise<void> {
    if (product.id != null) {
      return this.firestore.collection('products').doc(product.id).update({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl
      });
    } else {
      console.error('Product id is null or undefined');
      return Promise.reject('Invalid product id');
    }
  }

  deleteProduct(id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).delete();
  }
}
