import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { PromptUpdateService } from 'src/app/core/services/general/prompt-update.service';
import { UpdateCheckService } from 'src/app/core/services/general/update-check.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private updateCheckService: UpdateCheckService,
    private promptUpdateService: PromptUpdateService,
    private productService: ProductService
  ) {
    this.updateCheckService.checkForUpdate();
    this.promptUpdateService.activateUpdate();
  }

  products: any[] = [];
  editProductId: any;
  addProductForm: boolean = false;
  editProductForm: boolean = false;
  noProducts: boolean = false;

  ngOnInit(): void {
    this.getProductList();
  }

  openAddModal() {
    this.addProductForm = true;
  }

  openEditModal(productId: number) {
    this.editProductId = productId;
    this.editProductForm = true;
  }

  getProductList() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        this.noProducts = true;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteProduct(productId: number) {
    let confirmed: boolean = confirm('Are you sure?');
    if (!confirmed) return;
    this.productService.deleteProduct(productId).subscribe({
      next: (res: any) => {
        this.products = this.products.filter(
          (product) => product.id != productId
        );
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onAddProduct(event: any) {
    if (typeof event == 'boolean') {
      this.addProductForm = event;
    } else {
      this.products.push(event);
    }
  }

  onEditProduct(event: any) {
    if (typeof event == 'boolean') {
      this.editProductForm = event;
    } else {
      this.products = this.products.map((product) => {
        if (product.id == event.id) return event;
        else return product;
      });
    }
  }
}
