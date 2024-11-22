import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSource = new BehaviorSubject<string[]>([]);

  categories$ = this.categoriesSource.asObservable();

  constructor() {
    const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    this.categoriesSource.next(savedCategories);
  }

  addCategory(category: string): void {
    const currentCategories = this.categoriesSource.value;
    currentCategories.push(category);
    this.categoriesSource.next(currentCategories);

    localStorage.setItem('categories', JSON.stringify(currentCategories));
  }
}