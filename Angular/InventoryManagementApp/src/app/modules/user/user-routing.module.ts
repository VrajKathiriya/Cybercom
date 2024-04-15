import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { authGuard } from 'src/app/core/guards/auth/auth.guard';
import { roleGuard } from 'src/app/core/guards/user/role.guard';
import { ErrorPageComponent } from '../general/components/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'admin',
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
export class UserRoutingModule {}
