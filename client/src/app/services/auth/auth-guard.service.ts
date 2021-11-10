import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  canActivate() {
    const token = localStorage.getItem("jwt");

    // Check if user is authenticated
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    // If user is not authenticated route to login page
    this.router.navigate(['login']);
    return false;
  }
}
