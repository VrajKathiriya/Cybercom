import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'blog/blog-list',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/blog/blog.module').then((mod) => mod.BlogModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((mod) => mod.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
