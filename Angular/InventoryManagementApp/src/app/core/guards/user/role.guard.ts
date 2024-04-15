import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUserProfile().pipe(
    map((d: any) => {
      if (d.role == route.data['role']) {
        return true;
      } else return router.createUrlTree(['access-denied']);
    })
  );
};
