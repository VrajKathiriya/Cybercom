import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  @Output() addCategoryChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private categoryService: CategoryService) {}

  addCategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl(''),
    categoryImage: new FormControl(''),
  });

  ngOnInit(): void {
    const openModelDiv = document.getElementById('exampleModal');
    if (openModelDiv) {
      openModelDiv.style.display = 'block';
    }
  }

  closeAddModal() {
    this.addCategoryChange.emit(false);
    const closeModelDiv = document.getElementById('exampleModal');
    if (closeModelDiv) {
      closeModelDiv.style.display = 'none';
    }
  }

  addCategory() {
    const category = {
      name: this.addCategoryForm.value.categoryName,
      image: 'https://placeimg.com/640/480/any',
    };

    this.categoryService.addCategory(category).subscribe({
      next: (res: any) => {
        console.log(res);
        this.closeAddModal();
        this.addCategoryChange.emit(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
