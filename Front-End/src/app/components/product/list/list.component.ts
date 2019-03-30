import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: ProductModel[];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct(): void {
    this.router.navigate(['add-product']);
  }

  deleteProduct(product: ProductModel) {
    this.productService.deleteProduct(product._id).subscribe(data => {
      this.getAllProducts();
    });
  }

  updateProduct(product: ProductModel) {
    localStorage.removeItem('productId');
    localStorage.setItem('productId', product._id);
    this.router.navigate(['edit-product']);
  }

}
