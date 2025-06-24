import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resetpassword',
  standalone: false,
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  token: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';
    });
  }

  resetPassword(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.resetPassword(this.email, this.token, this.password).subscribe({
    error: (response: any) => {
      if( response.status=='200') {
            this.successMessage = 'Password Changed Successfully';
            this.errorMessage = '';
            setTimeout(() => {this.router.navigate(['/login']);}, 3000);
      }
      else {
           this.errorMessage = 'Failed to reset password.';
           this.successMessage = '';
      }
  },
  });

  }
}
