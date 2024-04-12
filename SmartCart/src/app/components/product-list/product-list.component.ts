import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  baseUrl: any = 'http://localhost:1337';
  products: any[] = [];
  product: any = {};
  filterProducts: any[] = [];
  categories: any[] = [];
  presentInCart: any[] = [];
  productDetailsModal: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.getCategories();
    this.getProductIdsFromCart();
  }

  lowValue: number = 0;
  highValue: number = 4;

  pageSize = 4;
  pageSizeOptions: number[] = [4, 8, 12, 24];

  onPageSizeChange(event: any): void {
    this.pageSize = event.pageSize;
  }

  getPaginatorData(event: any): any {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  onCategoryChange(event: any): any {
    console.log(event.value);
    console.log(this.products);
    this.filterProducts = this.products.filter(
      (product) =>
        product.attributes.category.data.attributes.category_name == event.value
    );
    console.log(this.products);
    this.lowValue = 0;
    this.highValue = this.lowValue + this.pageSize;

    return event;
  }

  getProductList() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.filterProducts = res.data;
        console.log(res.data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        console.log(res);
      },
    });
  }

  getProductIdsFromCart() {
    let userId = localStorage.getItem('user_id');
    this.cartService.getCartItems(userId).subscribe({
      next: (res: any) => {
        res.data.forEach((cart: any) => {
          this.presentInCart.push(cart.attributes.product.data.id);
        });
        const currentTimestamp = new Date().toISOString();
        console.log(currentTimestamp);
      },
    });
  }

  addProductToCart(productId: any) {
    const product = {
      data: {
        product: productId,
        quantity: 1,
        order: null,
        user_detail: localStorage.getItem('user_id'),
      },
    };

    if (this.presentInCart.includes(productId)) {
      alert('your product is already present in cart');
    } else {
      this.cartService.addCartItem(product).subscribe({
        next: (res: any) => {
          console.log(res);
          alert('your product is added in cart successfully');
          this.presentInCart.push(res.data.attributes.product.data.id);
        },
      });
    }
  }

  showProductDetails(product: any) {
    console.log(product);
    this.product = product;
    this.productDetailsModal = true;
  }

  onProductDetailsChange(event: any) {
    this.productDetailsModal = event;
  }
}
