import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'You must enter a value';
    if (this.email.hasError('email')) return 'Not a valid email';
    return this.email.hasError('invalidCredentials') ? 'Invalid Credentials' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) return 'You must enter a value';
    return this.password.hasError('invalidCredentials') ? 'Invalid Credentials' : '';
  }

  onSubmit() {

    const credentials = {
      email: this.email.value,
      password: this.password.value
    }

    this.authService.userAuthenaticationLogin(credentials)
      .subscribe((response) => {

        const token = response.token;
        localStorage.setItem("jwt", token);

        this.authService.isLoggedIn(); // Check if user is logged in
        this.router.navigate(['/']);
      },
      (err) => { 
        const { errors } = err.error;
        if (errors[0].param === 'invalidCredentials') {
          this.password.setErrors({'invalidCredentials': true});
          this.email.setErrors({'invalidCredentials': true});
        };
        
      });
  }
}