import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // لو route عايز admin بس
    if (route.data['role'] === 'admin' && !this.auth.isAdmin()) {
      this.router.navigate(['/products']);
      return false;
    }

    return true;
  }
}
