import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-add',
  standalone: false,
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {
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
