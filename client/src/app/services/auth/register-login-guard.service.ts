import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RegisterLoginGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  canActivate() {
    const token = localStorage.getItem("jwt");

    // Check if user is authenticated route to home page
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/']);
      return false;
    }

    // If user is not authenticated
    return true
  }
}
