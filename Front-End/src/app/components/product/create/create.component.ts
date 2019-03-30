import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {}

  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      company: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.productService.addProduct(this.addForm.value).subscribe(data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }

  // get the form short name to access the form fields
  get f() {
    return this.addForm.controls;
  }
}
