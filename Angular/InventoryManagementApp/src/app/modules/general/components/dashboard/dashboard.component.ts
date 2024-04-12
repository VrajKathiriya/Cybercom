import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalProducts: number = 0;
  totalCategories: number = 0;
  totalUsers: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal() {
    // get total number of products
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.totalProducts = res.length;
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    // get total number of categories
    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.totalCategories = res.length;
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    // get total number of users
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.totalUsers = res.length;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
