import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  editCategoryId: any;
  addCategoryForm: boolean = false;
  editCategoryForm: boolean = false;
  noCategories: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        console.log(res);
        this.categories = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openAddModal() {
    this.addCategoryForm = true;
  }

  onAddCategory(event: any) {
    if (typeof event == 'boolean') {
      this.addCategoryForm = event;
    } else {
      this.categories.push(event);
    }
  }

  openEditModal(categoryId: number) {
    this.editCategoryId = categoryId;
    this.editCategoryForm = true;
  }

  onEditCategory(event: any) {
    if (typeof event == 'boolean') {
      this.editCategoryForm = event;
    } else {
      this.categories = this.categories.map((category: any) => {
        if (category.id == event.id) return event;
        else return category;
      });
    }
  }

  deleteCategory(categoryId: number) {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.categories = this.categories.filter(
          (category: any) => category.id != categoryId
        );
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
