import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { authGuard } from 'src/app/core/guards/auth/auth.guard';
import { roleGuard } from 'src/app/core/guards/user/role.guard';
import { ErrorPageComponent } from '../general/components/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'customer',
    },
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
export class ProductRoutingModule {}
