import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Output() addProductChange: EventEmitter<any> = new EventEmitter<any>();

  categories: any[] = [];

  addProductForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productCategory: new FormControl('', [Validators.required]),
    productImageUrl: new FormControl('', [Validators.required]),
  });
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.addProductForm = this.fb.group({
      productName: [''],
    });
  }

  ngOnInit(): void {
    const openModelDiv = document.getElementById('exampleModal');
    if (openModelDiv) {
      openModelDiv.style.display = 'block';
    }
    this.getAllCategories();
    // this.addValidators();
    // this.addProductForm.get('productName')?.valueChanges.subscribe((value) => {
    //   console.log('Value changed: ', value);
    // });
  }

  // addValidators() {
  //   this.addProductForm
  //     .get('productName')
  //     ?.setValidators([Validators.required]);
  //   this.addProductForm.get('productName')?.updateValueAndValidity();
  // }

  // removeValidators() {
  //   this.addProductForm.get('productName')?.clearValidators();
  //   this.addProductForm.get('productName')?.updateValueAndValidity(); // Update validity after changing validators
  // }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addProduct() {
    const product = {
      title: this.addProductForm.value.productName,
      price: this.addProductForm.value.productPrice,
      description: this.addProductForm.value.productDescription,
      categoryId: this.addProductForm.value.productCategory,
      images: [this.addProductForm.value.productImageUrl],
    };

    this.productService.addProduct(product).subscribe({
      next: (res: any) => {
        console.log(res);
        this.closeAddModal();
        this.addProductChange.emit(res);
        this.toastr.success('Your product is added successfully', 'Success!');
      },
      error: (err: any) => {
        this.toastr.error(err.error.message[0], 'Error💥');
      },
    });
  }

  closeAddModal() {
    this.addProductChange.emit(false);
    const closeModelDiv = document.getElementById('exampleModal');
    if (closeModelDiv) {
      closeModelDiv.style.display = 'none';
    }
  }
}
