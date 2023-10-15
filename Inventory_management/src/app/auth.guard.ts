import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is logged in based on the isLoggedIn flag in AuthService
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      // Redirect to the login page if not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}