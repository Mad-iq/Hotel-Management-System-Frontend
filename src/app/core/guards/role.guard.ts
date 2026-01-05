import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../auth/auth.service';


export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data['roles'] as string[];

  if (!allowedRoles || allowedRoles.length === 0) {
    router.navigate(['/unauthorized']);
    return false;
  }

  const userRoles = authService.getRoles();

  const hasAccess = allowedRoles.some(role =>
    userRoles.includes(role)
  );

  if (!hasAccess) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
