import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = { name: "" };

  isUserLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        this.subscription = this.authService.checkIsLoggedIn()
          .subscribe(value => this.isUserLoggedIn = value);
      }
      
    });

    this.authService.getLoginUser()
      .subscribe((user) => { this.user = user });

  }

  logout() {
    this.authService.userAuthenaticationLogout();
  }

}
