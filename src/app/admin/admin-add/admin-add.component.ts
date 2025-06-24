import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-admin-add',
  standalone: false,
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.css'
})
export class AdminAddComponent {
   user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'Admin'
  };

  error = '';

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {}

  register(): void {
    if (this.user) {
      this.user.username=this.user.email
      this.auth.registerClient(this.user).subscribe(() => {
        this.router.navigate(['/admin-dashboard/users/admins']);
      });
    }
  }
}
