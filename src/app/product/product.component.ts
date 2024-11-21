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
  category:string;
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
    category:''
  };
  isEditMode: boolean = false;
  editingProductId: string | null = null;
  imagePreview: string | null = null;
  imageUrl: string = '';
  uploadimg:string = '';
categories: any;
category: any;

  constructor(
    private productService: ProductService,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  loadCategories(): void {
  const savedCategories = localStorage.getItem('categories');
  if (savedCategories) {
    const categories = JSON.parse(savedCategories);
    this.categories = categories.map((cat: any) => cat.name); 
  }
}
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
   
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.uploadimg = e.target?.result as string;
        this.imagePreview=e.target?.result as string
      };
      
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
      this.newProduct.offerprice &&
      this.newProduct.category
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
      category:'',
    };
    this.imagePreview = null;
    this.imageUrl = '';
    this.isEditMode = false; 
    this.editingProductId = null;
  }
}
