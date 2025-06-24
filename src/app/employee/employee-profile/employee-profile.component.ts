import { Component, OnInit } from '@angular/core';
import { UpdateUser } from '../../models/homeservices';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-profile',
  standalone: false,
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent implements OnInit{
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
      this.userService.getEmployeeById(this.userId).subscribe({
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
