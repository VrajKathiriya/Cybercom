import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { ErrorPageComponent } from '../general/components/error-page/error-page.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

const routes: Routes = [
  {
    path: 'blog-list',
    component: BlogListComponent,
  },
  {
    path: 'add-blog',
    component: AddBlogComponent,
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
