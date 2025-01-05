import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories = [];
  newCategory = { name: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  addCategory() {
    this.categoryService.createCategory(this.newCategory).subscribe(() => {
      this.getCategories();
      this.newCategory.name = '';  // Reset input field
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategories();
    });
  }
}
