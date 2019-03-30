import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/ProductModel';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  product: ProductModel;
  editForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    const productId = localStorage.getItem('productId');
    if (!productId) {
      alert('Something wrong!');
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      company: ['', Validators.required]
    });

    this.productService.getProductById(productId).subscribe(data => {
      console.log(data);
      this.editForm.patchValue(data); // Don't use editForm.setValue() as it will throw console error
    });
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.productService.updateProduct(this.editForm.value)
      .subscribe( data => {
        this.router.navigate(['']);
      });
    }
  }

}
