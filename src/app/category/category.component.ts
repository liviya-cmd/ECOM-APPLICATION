import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  name: string = '';
  image: File | null = null;
  imagePreview: string | null = null;
  editIndex: number | null = null; 

  data: { name: string; imageUrl: string }[] = [];

  ngOnInit(): void {
    const savedData = localStorage.getItem('categories');
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.name && this.image) {
      const imageUrl = this.imagePreview || '';
      const newEntry = { name: this.name, imageUrl };

      if (this.editIndex !== null) {
        this.data[this.editIndex] = newEntry;
        console.log('Data updated:', newEntry);
        this.editIndex = null;
      } else {
        this.data.push(newEntry);
        console.log('Data submitted:', newEntry);
      }

      localStorage.setItem('categories', JSON.stringify(this.data));

      this.resetForm();
    }
  }

  onEdit(index: number) {
    const entry = this.data[index];
    this.name = entry.name;
    this.imagePreview = entry.imageUrl;
    this.editIndex = index;
  }

  onDelete(index: number) {
    this.data.splice(index, 1); 
    console.log('Data deleted:', this.data);
    localStorage.setItem('categories', JSON.stringify(this.data));
  }
  resetForm() {
    this.name = '';
    this.image = null;
    this.imagePreview = null;
  }
}
