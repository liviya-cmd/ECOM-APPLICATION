import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  offerprice: string;
  uploadimg: string ;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    offerprice: '',
    uploadimg: '',
  };
  isEditMode: boolean = false;
  editingProductId: string | null = null;
  imagePreview: string | null = null;
  imageUrl: string = '';
  uploadimg:string = '';

  constructor(
    private productService: ProductService,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Create a FileReader
      const reader = new FileReader();
      
      // Set up the onload event to create blob URL
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Create blob URL
        this.uploadimg = e.target?.result as string;
        this.imagePreview=e.target?.result as string
      };
      
      // Read the file as data URL
      reader.readAsDataURL(file);
      
    }
  }

  ngOnDestroy(): void {
    if (this.uploadimg) {
      URL.revokeObjectURL(this.uploadimg);
    }
  }

  addOrUpdateProduct(): void {
    if (
      this.newProduct.name &&
      this.newProduct.description &&
      this.newProduct.price &&
      this.newProduct.offerprice
    ) {
      if (this.isEditMode && this.editingProductId) {
        this.newProduct.id = this.editingProductId;
        this.productService.updateProduct(this.newProduct)
          .then(() => {
            this.resetForm();
            this.loadProducts();
          })
          .catch((error) => console.error('Error updating product: ', error));
      } else {
        this.newProduct.imageUrl = this.imageUrl || this.newProduct.imageUrl;
        this.newProduct.offerprice = this.newProduct.offerprice || '';
        this.newProduct.uploadimg = this.uploadimg || this.newProduct.uploadimg ;

        this.productService.addProduct(this.newProduct)
          .then(() => {
            this.resetForm();
            this.loadProducts();
          })
          .catch((error) => console.error('Error adding product: ', error));
      }
    }
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.editingProductId = product.id;
    this.newProduct = { ...product };
    this.imagePreview = product.imageUrl;
    this.imageUrl = product.imageUrl;
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id)
      .then(() => {
        this.loadProducts();
      })
      .catch((error) => console.error('Error deleting product: ', error));
  }

  
  resetForm(): void {
    this.newProduct = {
      id: '',
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      offerprice: '',
      uploadimg: '',
    };
    this.imagePreview = null;
    this.imageUrl = '';
    this.isEditMode = false; 
    this.editingProductId = null;
  }
}
