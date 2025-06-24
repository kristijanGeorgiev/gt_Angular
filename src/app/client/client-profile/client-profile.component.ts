import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UpdateUser } from '../../models/homeservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-profile',
  standalone: false,
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  userId: number = 0;
  user: UpdateUser = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.userService.getClientById(this.userId).subscribe({
        next: (data) => {
          this.user = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : ''
          };
        },
        error: () => {
          this.errorMessage = 'Failed to load user data.';
        }
      });
    }
  }

  updateProfile(form: NgForm) {
  if (form.invalid) return;

  const userId = Number(localStorage.getItem('userId'));
  this.userService.updateClient(userId, this.user).subscribe({
    next: () => {
      this.successMessage = 'Profile updated successfully!';
      this.errorMessage = '';
    },
    error: () => {
      this.successMessage = '';
      this.errorMessage = 'Failed to update profile.';
    }
  });
}
back(): void {
    {
        this.router.navigate(['/client-dashboard/dashboard']);
    };
    }
}
