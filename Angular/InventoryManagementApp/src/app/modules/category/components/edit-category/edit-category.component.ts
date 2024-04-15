import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  @Output() editCategoryChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() categoryId: any;

  editCategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl(''),
    categoryImage: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEditCategory();
    const openModelDiv = document.getElementById('exampleModal');
    if (openModelDiv) {
      openModelDiv.style.display = 'block';
    }
  }

  getEditCategory() {
    this.categoryService.getCategory(this.categoryId).subscribe({
      next: (res: any) => {
        this.editCategoryForm.patchValue({
          categoryName: res.name,
          categoryImage: res.image,
        });
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  closeEditModal() {
    this.editCategoryChange.emit(false);
    const closeModelDiv = document.getElementById('exampleModal');
    if (closeModelDiv) {
      closeModelDiv.style.display = 'none';
    }
  }

  updateCategory() {
    const category = {
      name: this.editCategoryForm.value.categoryName,
      image: this.editCategoryForm.value.categoryImage,
    };

    this.categoryService.updateCategory(this.categoryId, category).subscribe({
      next: (res: any) => {
        console.log(res);
        this.closeEditModal();
        this.editCategoryChange.emit(res);

        this.toastr.success(
          'Your category is updated successfully',
          'Success!'
        );
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message[0], 'Error💥');
      },
    });
  }
}
