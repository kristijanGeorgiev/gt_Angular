import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UpdateUser } from '../../models/homeservices';


@Component({
  selector: 'app-admin-profile',
  standalone: false,
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})

export class AdminProfileComponent implements OnInit {
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

  constructor(private userService: UserService) {}


   ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.userService.getAdminById(this.userId).subscribe({
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
}