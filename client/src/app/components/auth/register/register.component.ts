import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required])
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  getNameErrorMessage() {
    if (this.name.hasError('required')) return 'You must enter a value';
    return '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'You must enter a value';
    if (this.email.hasError('email')) return 'Not a valid email';
    if (this.email.hasError('userExists')) return 'User already exists';
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) return 'You must enter a value';
    if (this.password.hasError('passwordMatch')) return 'Passwords do not match';
    if (this.password.hasError('password')) return 'Enter a password with 6 or more characters';
    return '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.confirmPassword.hasError('required')) return 'You must enter a value';
    if (this.confirmPassword.hasError('passwordMatch')) return 'Passwords do not match';
    if (this.password.hasError('password')) return 'Enter a password with 6 or more characters';
    return '';
  }

  onSubmit() {
    
    // checks if passwords do not match
    if (this.password.value !== this.confirmPassword.value) {
      this.password.setErrors({ 'passwordMatch': true });
      this.confirmPassword.setErrors({ 'passwordMatch': true });
      return;
    }

    // checks if inputs are valid
    if (!this.name.valid || !this.email.valid || !this.password.valid || !this.confirmPassword.valid) {
      return;
    }

    const newUser = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    }

    this.userService.userRegister(newUser)
      .subscribe((response) => {

        const token = response.token;
        localStorage.setItem("jwt", token);

        this.authService.isLoggedIn(); // Check if user is logged in
        this.router.navigate(['/']);
      },
      (err) => {
        const { errors } = err.error;

        errors.forEach((error: any) => {
          if (error.param === 'userExists') this.email.setErrors({ 'userExists': true });
          if (error.param === 'password') this.password.setErrors({ 'password': true });
          if (error.param === 'password') this.confirmPassword.setErrors({ 'password': true });
        });
      });
  }
}
