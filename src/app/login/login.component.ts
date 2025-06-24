import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/homeservices';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: Login = { username: '', password: '' };
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userId', res.userId.toString());
        localStorage.setItem('email', res.email);
        localStorage.setItem('phone', res.phone);
        localStorage.setItem('address', res.address);
        localStorage.setItem('firstName', res.firstName);
        localStorage.setItem('lastName', res.lastName);
        if (res.role === 'Admin') {
          this.router.navigate(['/admin-dashboard/dashboard']);
        } else if (res.role === 'Employee') {
          this.router.navigate(['/employee-dashboard/dashboard']);
        } else {
          this.router.navigate(['/client-dashboard/dashboard']);
        }
      },
      error: () => {
        this.error = 'Invalid login';
      }
    });
  }
  goToForgotPassword(): void {
  this.router.navigate(['/forgotpassword']);
}
}