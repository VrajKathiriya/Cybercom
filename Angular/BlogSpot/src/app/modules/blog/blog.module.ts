import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

@NgModule({
  declarations: [BlogListComponent, AddBlogComponent, BookmarksComponent],
  imports: [CommonModule, BlogRoutingModule, SharedModule, ReactiveFormsModule],
})
export class BlogModule {}
