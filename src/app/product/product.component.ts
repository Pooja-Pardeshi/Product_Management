import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products = [];
  categories = [];
  newProduct = { name: '', categoryId: null };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts(page: number = 1) {
    this.productService.getProducts(page).subscribe((data: any) => {
      this.products = data.products;
    });
  }
  

  getCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  addProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.getProducts();
      this.newProduct = { name: '', categoryId: null }; // Reset form
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }
}
