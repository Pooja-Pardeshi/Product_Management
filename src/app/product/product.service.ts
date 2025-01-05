import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3002/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
