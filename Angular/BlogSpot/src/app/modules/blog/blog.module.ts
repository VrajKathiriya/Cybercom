import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BlogListComponent, AddBlogComponent],
  imports: [CommonModule, BlogRoutingModule, SharedModule, ReactiveFormsModule],
})
export class BlogModule {}
