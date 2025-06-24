import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: false,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
   email: string = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  sendRecoveryEmail(): void {
    this.authService.sendPasswordRecoveryEmail(this.email).subscribe({
      next: () => {
        this.successMessage = 'Recovery email sent! Please check your inbox.';
        this.errorMessage = '';
          setTimeout(() => {this.router.navigate(['/home']);}, 5000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to send recovery email.';
        console.error(err);
      }
    });
  }
}
