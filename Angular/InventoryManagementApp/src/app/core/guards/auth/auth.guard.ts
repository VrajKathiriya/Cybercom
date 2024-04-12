import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token') || '';

  const jwtToken = token ? JSON.parse(token) : '' || null;

  return jwtToken ? true : inject(Router).createUrlTree(['/auth/login']);
};
