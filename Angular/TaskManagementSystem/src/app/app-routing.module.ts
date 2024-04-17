import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './modules/general/components/navbar/navbar.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/general/general.module').then(
        (mod) => mod.GeneralModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'task',
    loadChildren: () =>
      import('./modules/task/task.module').then((mod) => mod.TaskModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
