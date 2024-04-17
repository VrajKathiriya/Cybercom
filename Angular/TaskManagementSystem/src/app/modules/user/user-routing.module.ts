import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { authGuard } from 'src/app/core/guards/auth/auth.guard';
import { roleGuard } from 'src/app/core/guards/role/role.guard';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'admin',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
