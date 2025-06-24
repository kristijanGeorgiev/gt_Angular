import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-employee-add',
  standalone: false,
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
   user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'Employee'
  };

  error = '';

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {}

  register(): void {
    if (this.user) {
      this.user.username=this.user.email
      this.auth.registerClient(this.user).subscribe(() => {
        this.router.navigate(['/admin-dashboard/users/clients']);
      });
    }
  }
}
