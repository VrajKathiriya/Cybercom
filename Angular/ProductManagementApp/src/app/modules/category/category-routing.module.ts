import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ErrorPageComponent } from '../general/components/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'category-list',
    component: CategoryListComponent,
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
export class CategoryRoutingModule {}
