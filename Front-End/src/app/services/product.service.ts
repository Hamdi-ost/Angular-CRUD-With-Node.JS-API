import { Injectable } from '@angular/core';
import { ProductModel } from '../models/ProductModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseurl = 'http://localhost:3000/';

  getAllProducts() {
    return this.http.get<ProductModel[]>(this.baseurl + 'Products');
  }

  getProductById(id: string) {
    return this.http.get<ProductModel>(this.baseurl + 'Products' + '/' + id);
  }

  addProduct(product: ProductModel) {
    return this.http.post(this.baseurl + 'Products', product);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseurl + 'Products' + '/' + id);
  }

  updateProduct(product: ProductModel) {
    return this.http.put(this.baseurl + 'Products' + '/' + product._id, product);
  }
}
