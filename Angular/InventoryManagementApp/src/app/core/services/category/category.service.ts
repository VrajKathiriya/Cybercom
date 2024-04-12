import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  category_url: string = environment.base_url + environment.category_url;
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(this.category_url);
  }

  getCategory(categoryId: number) {
    return this.http.get(this.category_url + `/${categoryId}`);
  }

  addCategory(category: any) {
    return this.http.post(this.category_url, category);
  }

  updateCategory(categoryId: number, category: any) {
    return this.http.put(this.category_url + `/${categoryId}`, category);
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(this.category_url + `/${categoryId}`);
  }
}
