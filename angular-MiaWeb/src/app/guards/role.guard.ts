import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      // Redirect to Anmeldung and include attempted URL
      this.router.navigate(['/anmeldung'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const requiredRole = route.data['role'];
    const requiredPermission = route.data['permission'];

    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/home']);
      return false;
    }

    if (requiredPermission && !this.authService.hasPermission(requiredPermission)) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
