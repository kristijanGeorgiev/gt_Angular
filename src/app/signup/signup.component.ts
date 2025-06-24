import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/homeservices';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'Client'
  };

  error = '';
  confirmPassword: string | undefined;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.user.username = this.user.email;
    this.auth.registerClient(this.user).subscribe({
      next: () => {
        this.auth.login({
          username: this.user.username,
          password: this.user.password
        }).subscribe({
          next: (res: LoginResponse) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);
            localStorage.setItem('userId', res.userId.toString());
            localStorage.setItem('email', res.email);
            localStorage.setItem('phone', res.phone);
            localStorage.setItem('username', res.username);
            localStorage.setItem('firstName', res.firstName);
            localStorage.setItem('lastName', res.lastName);
            this.router.navigate(['/client-dashboard/dashboard']);
          },
          error: () => this.error = 'Login failed after registration'
        });
      },
      error: () => this.error = 'Registration failed'
    });
  }
  get passwordMismatch(): boolean {
  return this.user.password !== this.confirmPassword;
}
}
