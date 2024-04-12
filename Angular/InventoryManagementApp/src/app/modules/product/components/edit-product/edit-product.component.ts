import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @Output() editProductChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() productId: any;

  categories: any[] = [];
  product: any = {};

  editProductForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productCategory: new FormControl('', [Validators.required]),
    productImageUrl: new FormControl('', [Validators.required]),
  });

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getEditProduct();
    this.getAllCategories();
    const openModelDiv = document.getElementById('exampleModal');
    if (openModelDiv) {
      openModelDiv.style.display = 'block';
    }
  }

  bindValues() {
    this.editProductForm.patchValue({
      productName: this.product.title,
      productPrice: this.product.price,
      productDescription: this.product.description,
      productImageUrl: this.product.images[0].slice(2).slice(0, -2),
    });
  }

  closeEditModal() {
    this.editProductChange.emit(false);
    const closeModelDiv = document.getElementById('exampleModal');
    if (closeModelDiv) {
      closeModelDiv.style.display = 'none';
    }
  }

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

  getEditProduct() {
    this.productService.getProduct(this.productId).subscribe({
      next: (res: any) => {
        this.product = res;
        this.bindValues();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  editProduct() {
    const product = {
      title: this.editProductForm.value.productName,
      price: this.editProductForm.value.productPrice,
      description: this.editProductForm.value.productDescription,
      categoryId: this.editProductForm.value.productCategory,
      images: [this.editProductForm.value.productImageUrl],
    };
    this.productService.updateProduct(this.product.id, product).subscribe({
      next: (res: any) => {
        this.product = res;
        this.closeEditModal();
        this.editProductChange.emit(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
