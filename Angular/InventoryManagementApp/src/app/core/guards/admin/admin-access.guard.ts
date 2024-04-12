import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

export const adminAccessGuard: CanActivateFn = (route, state) => {
  return true;
};
